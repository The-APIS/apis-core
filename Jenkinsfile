def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.0', command: 'cat', ttyEnabled: true),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  hostPathVolume(mountPath: '/app', hostPath: '/'),
]) {
  node(label) {
    def gateway
    def bitcoinRpc
    def ethereumRpc

    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)
    def registry = "registry.trustedlife.app"

    def gatewayImageName = "apiscore-gateway"
    def gatewayImage = "${registry}/${gatewayImageName}"

    def bitcoinRpcImageName = "apiscore-bitcoin-rpc"
    def bitcoinRpcImage = "${registry}/${bitcoinRpcImageName}"

    def ethereumRpcImageName = "apiscore-ethereum-rpc"
    def ethereumRpcImage = "${registry}/${ethereumRpcImageName}"

    container('docker') {
      stage('Build') {
        checkout scm
        dir('gateway/src') {
          gateway = docker.build("${gatewayImage}", "-f Dockerfile .")
        }
        dir('bitcoin-rpc/src') {
          bitcoinRpc = docker.build("${bitcoinRpcImage}", "-f Dockerfile .")
        }
        dir('ethereum-rpc/src') {
          ethereumRpc = docker.build("${ethereumRpcImage}", "-f Dockerfile .")
        }
      }
      stage('Push') {
        docker.withRegistry('https://registry.trustedlife.app') {
          gateway.push("latest")
          bitcoinRpc.push("latest")
          ethereumRpc.push("latest")
        }
      }
    }

    // stage('Deploy (kubectl)') {
    //   container('kubectl') {
    //     sh """
    //       # without tagging, rollout will not be triggered
    //       # patch, to force rollout (development envs only)

    //       # kubectl set image -n apiscore deployment/gateway gateway=${gatewayImage}:latest
    //       # kubectl patch -n apiscore deployment/gateway -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'

    //       # kubectl set image -n apiscore deployment/bitcoin-rpc bitcoin-rpc=${bitcoinRpcImage}:latest
    //       # kubectl patch -n apiscore deployment/bitcoin-rpc -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'

    //       # kubectl set image -n apiscore deployment/ethereum-rpc ethereum-rpc=${ethereumRpcImage}:latest
    //       # kubectl patch -n apiscore deployment/ethereum-rpc -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'
            // kubectl set image -n apiscore deployment/gateway gateway=registry.trustedlife.app/apiscore-gateway:latest
            // kubectl patch -n apiscore deployment/gateway -p '{"spec":{"template":{"metadata":{"labels":{"date":"1"}}}}}'

            // kubectl set image -n apiscore deployment/bitcoin-rpc bitcoin-rpc=registry.trustedlife.app/apiscore-bitcoin-rpc:latest
            // kubectl patch -n apiscore deployment/bitcoin-rpc -p '{"spec":{"template":{"metadata":{"labels":{"date":"1"}}}}}'

            // kubectl set image -n apiscore deployment/ethereum-rpc ethereum-rpc=registry.trustedlife.app/apiscore-ethereum-rpc:latest
            // kubectl patch -n apiscore deployment/ethereum-rpc -p '{"spec":{"template":{"metadata":{"labels":{"date":"1"}}}}}'
    //       """
    //   }
    // }
  }
}
