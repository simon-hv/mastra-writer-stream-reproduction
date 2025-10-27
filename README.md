## Writer does not work after resuming a workflow

### Test it

```bash
npm install
npx tsx src/index.ts
```

---

### Issue

After running this, you'll notice the writer only works before resuming the workflow. After resuming, I don't see any writer output.

What I see after the workflow is ran:

```json
{
  "type": 'workflow-step-output',
  "runId": 'e759fbc6-72a0-40d9-b5c4-4d5ee4e7259d',
  "from": 'USER',
  "payload": {
    "output": { type: 'text', content: 'Begining "execution" of step 1' },
    "runId": 'e759fbc6-72a0-40d9-b5c4-4d5ee4e7259d',
    "stepName": 'step1'
  }
}
{
  "type": 'workflow-step-output',
  "runId": 'e759fbc6-72a0-40d9-b5c4-4d5ee4e7259d',
  "from": 'USER',
  "payload": {
    "output": { type: 'text', content: 'Suspending step 1' },
    "runId": 'e759fbc6-72a0-40d9-b5c4-4d5ee4e7259d',
    "stepName": 'step1'
  }
}
```

What **I expect to see** after resuming:

```json
{
  "type": "workflow-step-output",
  "runId": "e759fbc6-72a0-40d9-b5c4-4d5ee4e7259d",
  "from": "USER",
  "payload": {
    "output": { "type": "text", "content": `Resumed step 1 with value left` },
    "runId": "e759fbc6-72a0-40d9-b5c4-4d5ee4e7259d",
    "stepName": "step1"
  }
}
```

But there are no logs of custom events after resuming.
