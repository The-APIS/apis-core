def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.15.11', command: 'cat', ttyEnabled: true),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  hostPathVolume(mountPath: '/app', hostPath: '/'),
]) {
  node(label) {
    def gateway
    def bitcoinRpc
    def ethereumRpc
    def bitcoinListener
    def ethereumListener
    def staticServer
    def developers

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

    def bitcoinListenerImageName = "apiscore-bitcoin-listener"
    def bitcoinListenerImage = "${registry}/${bitcoinListenerImageName}"

    def ethereumListenerImageName = "apiscore-ethereum-listener"
    def ethereumListenerImage = "${registry}/${ethereumListenerImageName}"

    def staticServerImageName = "apiscore-static"
    def staticServerImage = "${registry}/${staticServerImageName}"

    def developersImageName = "apiscore-developers"
    def developersImage = "${registry}/${developersImageName}"

    container('docker') {
      stage('Build') {
        checkout scm
        gateway = docker.build("${gatewayImage}", "-f gateway/src/Dockerfile .")
        bitcoinRpc = docker.build("${bitcoinRpcImage}", "-f bitcoin-rpc/src/Dockerfile .")
        bitcoinListener = docker.build("${bitcoinListenerImage}", "-f bitcoin-listener/src/Dockerfile .")
        ethereumRpc = docker.build("${ethereumRpcImage}", "-f ethereum-rpc/src/Dockerfile .")
        ethereumListener = docker.build("${ethereumListenerImage}", "-f ethereum-listener/src/Dockerfile .")
        developers = docker.build("${developersImageName}", "-f developers/Production.Dockerfile ./developers")
        staticServer = docker.build("${staticServerImage}", "-f static/Dockerfile ./static/src")
      }
      stage('Push') {
        docker.withRegistry('https://registry.trustedlife.app') {
          gateway.push("latest")
          bitcoinRpc.push("latest")
          ethereumRpc.push("latest")
          bitcoinListener.push("latest")
          ethereumListener.push("latest")
          developers.push("latest")
          staticServer.push("latest")
        }
      }
    }

    stage('Deploy (kubectl)') {
      container('kubectl') {
        sh """
          # without tagging, rollout will not be triggered
          # patch, to force rollout (development envs only)

          kubectl set image -n apis deployment/gateway \
            gateway=${gatewayImage}:latest \
            bitcoin-rpc=${bitcoinRpcImage}:latest \
            bitcoin-listener=${bitcoinListenerImage}:latest \
            ethereum-rpc=${ethereumRpcImage}:latest \
            ethereum-listener=${ethereumListenerImage}:latest
            # static=${staticServerImage}:latest # does not exist in dev

          kubectl set image -n apis deployment/developers \
            web=${developersImage}:latest

          kubectl patch -n apis deployment/gateway -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'
          kubectl patch -n apis deployment/developers -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'

          """
      }
    }
  }
}
