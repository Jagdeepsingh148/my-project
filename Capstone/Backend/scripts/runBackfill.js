import { runBackfillPipeline } from '../src/backfill/backfillRunner.js'

runBackfillPipeline().catch(err => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
