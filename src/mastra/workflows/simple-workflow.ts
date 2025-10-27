import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const step1 = createStep({
  id: 'step1',
  inputSchema: z.object({}),
  resumeSchema: z.object({
    value: z.string(),
  }),
  outputSchema: z.object({
    value: z.string(),
  }),
  execute: async ({ resumeData, writer, suspend }) => {
    await writer.write({ type: 'text', content: `Begining execution of step 1` });

    if (!resumeData?.value) {
      await writer.write({ type: 'text', content: 'Suspending step 1' });
      return await suspend({});
    }

    await writer.write({ type: 'text', content: `Resumed step 1 with value ${resumeData.value}` });

    return {
      value: resumeData.value,
    };
  },
});

export const mainWorkflow = createWorkflow({
  id: 'mainWorkflow',
  inputSchema: z.object({}),
  outputSchema: z.object({
    value: z.string(),
  }),
})
  .then(step1)
  .commit();
