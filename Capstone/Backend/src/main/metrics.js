import client from 'prom-client'

export class Metrics {
  constructor() {
    this.ingestCounter = new client.Counter({ name: 'fs_ingest_count', help: 'ingested events' })
    this.readLatency = new client.Histogram({ name: 'fs_read_latency_seconds', help: 'read latency secs', buckets: [0.001, 0.01, 0.1, 1] })
    this.computeLag = new client.Gauge({ name: 'fs_compute_lag_seconds', help: 'compute lag seconds' })
  }
}
