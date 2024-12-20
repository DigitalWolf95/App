import { getVarcelLastSuccessfulDeploymentUuid, redeployVarcelDeploymentProcess } from './varcelApi';

export async function triggerVarcelDeploy(): Promise<void> {
  const apiToken = process.env.VARCEL_API_TOKEN;
  const projectId = process.env.VARCEL_PROJECT_ID;

  const deploymentId = await getVarcelLastSuccessfulDeploymentUuid({ apiToken, projectId });
  await redeployVarcelDeploymentProcess({ apiToken, projectId, deploymentId });
}
