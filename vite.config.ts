import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const apiDevPlugin = (envVars: Record<string, string>): Plugin => ({
  name: 'api-dev-server',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url && req.url.startsWith('/api')) {
        try {
          const { app } = await server.ssrLoadModule('/src/server/index.ts');
          const protocol = req.headers['x-forwarded-proto'] || 'http';
          const host = req.headers.host || 'localhost:5173';
          const url = new URL(req.url, `${protocol}://${host}`);

          let body: any = null;
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            const chunks: Uint8Array[] = [];
            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            }
            body = Buffer.concat(chunks);
          }

          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value) {
              if (Array.isArray(value)) {
                value.forEach((v) => headers.append(key, v));
              } else {
                headers.set(key, value);
              }
            }
          }

          const webReq = new Request(url.toString(), {
            method: req.method,
            headers,
            body: body && body.length > 0 ? body : undefined,
          });

          // Pass loaded environment variables to Hono app
          const webRes = await app.fetch(webReq, {
            ...process.env,
            ...envVars,
          });

          res.statusCode = webRes.status;
          webRes.headers.forEach((v: string, k: string) => {
            res.setHeader(k, v);
          });

          const resBody = await webRes.arrayBuffer();
          res.end(Buffer.from(resBody));
          return;
        } catch (err) {
          console.error('API Dev Server error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error in Dev API' }));
          return;
        }
      }
      next();
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for Node modules that access process.env directly
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevPlugin(env)],
  };
});
