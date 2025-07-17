import { useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { Types } from '@prequist/lanyard';

export type Options = {
  /**
   * The Base URL of Lanyard's API. Defaults to `https://api.lanyard.rest`
   */
  api: {
    hostname: string;
    secure?: boolean;
  };

  /**
   * Initial data to use. Useful if server side rendering.
   */
  initialData?: Types.Presence;
};

const DEFAULT_OPTIONS: Options = {
  api: {
    hostname: 'api.lanyard.rest',
    secure: true
  }
};

export const SocketOpcode = {
  Event: 0,
  Hello: 1,
  Initialize: 2,
  Heartbeat: 3
} as const;

export type SocketOpcode = (typeof SocketOpcode)[keyof typeof SocketOpcode];

export const SocketEvents = {
  INIT_STATE: 'INIT_STATE',
  PRESENCE_UPDATE: 'PRESENCE_UPDATE'
} as const;

export type SocketEvents = (typeof SocketEvents)[keyof typeof SocketEvents];

export type SocketData = Types.Presence & {
  heartbeat_interval?: number;
};

export type SocketMessage = {
  op: SocketOpcode;
  t?: SocketEvents;
  d?: SocketData;
};

/**
 * To avoid setting a timeout with no interval, we should
 * just fallback to a safe/sensible default (10s)
 */
const SAFE_DEFAULT_HEARTBEAT = 10_000;

export function useLanyard(
  snowflake: Types.Snowflake,
  options: Partial<Options> & {
    initialData: NonNullable<Options['initialData']>;
  }
): Types.Presence;

export function useLanyard(
  snowflake: Types.Snowflake,
  options?: Partial<Options>
): Types.Presence | null;

export function useLanyard(
  snowflake: Types.Snowflake,
  userOptions?: Partial<Options>
): Types.Presence | null {
  const options = {
    ...DEFAULT_OPTIONS,
    ...userOptions
  };

  const [data, setData] = useLocalStorage<Types.Presence | null>(
    'lanyard',
    null
  );

  const protocol = options.api.secure ? 'wss' : 'ws';
  const url = `${protocol}://${options.api.hostname}/socket`;

  useEffect(() => {
    // Don't try to connect on server
    if (typeof window === 'undefined') {
      return;
    }

    if (!('WebSocket' in window)) {
      throw new Error(
        'Lanyard failed to connect: The WebSocket API is not supported in this browser.'
      );
    }

    let heartbeat: ReturnType<typeof setTimeout>;

    /**
     * The current instance of the WebSocket.
     *
     * When the socket unexpectedly closes, this variable
     * will be reassigned to a new socket instance.
     */
    let socket: WebSocket;

    function connect(): void {
      if (heartbeat) {
        clearInterval(heartbeat);
      }

      socket = new WebSocket(url);

      socket.addEventListener('close', connect);
      socket.addEventListener('message', message);
    }

    function message(event: MessageEvent<string>): void {
      const message = JSON.parse(event.data) as SocketMessage;

      switch (message.op) {
        case SocketOpcode.Hello: {
          heartbeat = setInterval(() => {
            if (socket.readyState === socket.OPEN) {
              socket.send(JSON.stringify({ op: SocketOpcode.Heartbeat }));
            }
          }, message.d?.heartbeat_interval ?? SAFE_DEFAULT_HEARTBEAT);

          if (socket.readyState === socket.OPEN) {
            socket.send(
              JSON.stringify({
                op: SocketOpcode.Initialize,
                d: { subscribe_to_id: snowflake }
              })
            );
          }

          break;
        }

        case SocketOpcode.Event: {
          switch (message.t) {
            case SocketEvents.INIT_STATE:
            case SocketEvents.PRESENCE_UPDATE: {
              if (message.d) {
                setData(message.d);
              }

              break;
            }

            default: {
              break;
            }
          }

          break;
        }

        default: {
          break;
        }
      }
    }

    connect();

    return (): void => {
      clearInterval(heartbeat);

      socket.removeEventListener('close', connect);
      socket.removeEventListener('message', message);

      socket.close();
    };
  }, [url, snowflake, setData]);

  return data ?? options.initialData ?? null;
}
