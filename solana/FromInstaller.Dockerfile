FROM centos:latest
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.4.8/install)"
RUN export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"
RUN ln -s /root/.local/share/solana/install/active_release/bin/solana /bin/solana
# RUN ln -s /root/.local/share/solana/install/active_release/bin/solana /usr/bin/solana
# RUN ls -lart /root/.local/share/solana/install/active_release/bin
# RUN /root/.local/share/solana/install/active_release/bin/solana --version
RUN solana --version
