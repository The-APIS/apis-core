def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'cypress', image: 'cypress/included:3.2.0', ttyEnabled: true, command: 'cat'),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]) {
  node(label) {
    container('cypress') {
      stage('Test e2e') {
        checkout scm
        ansiColor('xterm') {
          sh """
            cd e2e && cypress run
          """
        }
      }
    }
  }
}
