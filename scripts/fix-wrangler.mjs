import { readFileSync, writeFileSync, existsSync } from 'fs';

const path = 'dist/server/wrangler.json';

const pagesAllowedKeys = new Set([
  'pages_build_output_dir',
  'compatibility_date',
  'compatibility_flags',
  'name',
  'vars',
  'd1_databases',
  'kv_namespaces',
  'durable_objects',
  'r2_buckets',
  'queues',
  'services',
  'analytics_engine_datasets',
  'dispatch_namespaces',
  'mtls_certificates',
  'logfwdr',
  'pipelines',
  'secrets_store_secrets',
  'vectorize',
  'hyperdrive',
  'workflows',
  'send_email',
  'cloudchamber',
  'ai',
  'ai_search',
  'ai_search_namespaces',
  'agent_memory',
]);

try {
  if (!existsSync(path)) {
    console.log('wrangler.json not found, skipping fix');
    process.exit(0);
  }

  const config = JSON.parse(readFileSync(path, 'utf8'));

  for (const key of Object.keys(config)) {
    if (!pagesAllowedKeys.has(key)) {
      delete config[key];
    }
  }

  writeFileSync(path, JSON.stringify(config, null, 2));
  console.log(
    'Fixed wrangler.json - removed Worker-only keys for Pages compatibility'
  );
} catch (err) {
  console.error('Failed to fix wrangler.json:', err.message);
  process.exit(1);
}
