// Lightweight readiness/liveness probe used by the blue/green deploy flow.
// The deploy script and Docker healthcheck poll this before flipping traffic,
// so it must stay cheap and never depend on slow upstreams.
export const dynamic = 'force-dynamic';

export function GET(): Response {
  return Response.json({ status: 'ok' });
}
