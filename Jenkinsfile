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
    def btcRpc
    def ethRpc

    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)
    def registry = "registry.trustedlife.app"

    def gatewayImageName = "apiscore-gateway"
    def gatewayImage = "${registry}/${gatewayImageName}"

    def btcRpcImageName = "apiscore-btc-rpc"
    def btcRpcImage = "${registry}/${btcRpcImageName}"

    def ethRpcImageName = "apiscore-eth-rpc"
    def ethRpcImage = "${registry}/${ethRpcImageName}"

    container('docker') {
      stage('Build Gateway') {
        checkout scm
        dir('gateway') {
          gateway = docker.build("${gatewayImage}", "-f Dockerfile .")
        }
      }
      stage('Build Gateway') {
        checkout scm
        dir('gateway') {
          gateway = docker.build("${gatewayImage}", "-f Dockerfile .")
        }
      }
      stage('Push') {
        docker.withRegistry('https://registry.trustedlife.app') {
          gateway.push("latest")
          btcRpc.push("latest")
          ethRpc.push("latest")
        }
      }
    }

    stage('Deploy (kubectl)') {
      container('kubectl') {
        sh """
          # without tagging, rollout will not be triggered
          # patch, to force rollout (development envs only)

          # TODO # kubectl set image -n apiscore deployment/gateway gateway=${gatewayImage}:latest
          # TODO # kubectl patch -n apiscore deployment/gateway -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'

          # TODO # kubectl set image -n apiscore deployment/btc-rpc btc-rpc=${btcRpcImage}:latest
          # TODO # kubectl patch -n apiscore deployment/btc-rpc -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'

          # TODO # kubectl set image -n apiscore deployment/eth-rpc eth-rpc=${ethRpcImage}:latest
          # TODO # kubectl patch -n apiscore deployment/eth-rpc -p '{"spec":{"template":{"metadata":{"labels":{"date":"${label}"}}}}}'
          """
      }
    }
  }
}
