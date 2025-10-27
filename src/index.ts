import { mastra } from './mastra';

const mainWorkflow = mastra.getWorkflow('mainWorkflow');

const run = await mainWorkflow.createRunAsync();

const stream = run.streamVNext({
  inputData: {},
});

for await (const event of stream.fullStream) {
  console.debug(event);
}

const resumedStream = run.resumeStreamVNext({ resumeData: { value: 'left' } as any });

for await (const event of resumedStream.fullStream) {
  console.debug(event);
}
