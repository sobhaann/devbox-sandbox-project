FROM postgres:16-alpine

# Patroni + etcd client + psycopg2, isolated in a venv to avoid PEP 668
# "externally managed environment" errors on Alpine. Everything here
# comes from PyPI/Alpine's own package index — no third-party image
# registries involved.
RUN apk add --no-cache python3 py3-pip bash curl \
    && python3 -m venv /opt/patroni-venv \
    && /opt/patroni-venv/bin/pip install --no-cache-dir --upgrade pip \
    && /opt/patroni-venv/bin/pip install --no-cache-dir "patroni[etcd3]" psycopg2-binary

ENV PATH="/opt/patroni-venv/bin:$PATH"

COPY patroni.yml /etc/patroni.yml
COPY post_bootstrap.sh /scripts/post_bootstrap.sh
RUN chmod +x /scripts/post_bootstrap.sh

USER postgres
ENTRYPOINT ["patroni", "/etc/patroni.yml"]
