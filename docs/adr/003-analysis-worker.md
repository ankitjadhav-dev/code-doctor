# ADR 003: defer the analysis worker

Analysis requires isolated, resource-limited jobs and will be implemented as a dedicated worker in a later phase. No untrusted repository code is cloned, installed, or executed in Phase 1.
