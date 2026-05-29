export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'edge') return;

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initializeAllContents } = await import('@lib/contents');

      await initializeAllContents();
    } catch (err) {
      console.error('instrumentation register error', err);
    }
  }
}
