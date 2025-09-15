
async function createOneTimeCronJob(jobName, image, cronTime) {
    const k8s = await import("@kubernetes/client-node");

    const kc = new k8s.KubeConfig();
    kc.loadFromCluster();
    const batchV1Api = kc.makeApiClient(k8s.BatchV1Api);

    const cronJobManifest = {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: {
            name: jobName,
            namespace: "default",
        },
        spec: {
            schedule: cronTime, // user-provided cron string
            successfulJobsHistoryLimit: 0,
            failedJobsHistoryLimit: 0,
            jobTemplate: {
                spec: {
                    ttlSecondsAfterFinished: 10, // auto-delete job after finish
                    template: {
                        spec: {
                            containers: [
                                {
                                    name: jobName,
                                    image,
                                },
                            ],
                            restartPolicy: "Never",
                        },
                    },
                    backoffLimit: 1,
                },
            },
        },
    };

    return batchV1Api.createNamespacedCronJob("default", cronJobManifest);
}

module.exports = { createOneTimeCronJob };
