<img width="1500" height="500" alt="image" src="https://github.com/user-attachments/assets/8742eb77-9a66-4645-8050-de0c0a8f0e82" />


# Psyop Strategy

Psyop Strategy is an automated dip-response policy engine designed to monitor token market conditions and coordinate full treasury reinjection strategies during predefined drawdown events.

The system continuously observes price data, detects structured drawdowns relative to recent peaks, and produces deterministic reinjection plans that allocate all accumulated developer fees and protocol profits back into the ecosystem when thresholds are met.

This repository focuses on detection, policy definition, accounting, and communication logic. Execution of capital movements is intentionally separated.

## Overview
Psyop Strategy operates as a modular service composed of the following layers:

- Market data ingestion
- Drawdown detection
- Treasury accounting
- Reinjection planning
- Automated communication and reporting

The system is designed to be transparent, auditable, and deterministic, with clear separation between policy logic and capital execution.

## Core Principles
- **Threshold-based response.** Reinjection events are triggered at fixed percentage drawdowns (e.g. 30% intervals) from a rolling local peak.
- **Full allocation policy.** All accumulated developer fees and protocol profits are allocated during each reinjection event.
- **Execution separation.** This codebase does not perform swaps, trades, or on-chain execution directly.
- **Deterministic behavior.** Identical inputs produce identical reinjection plans.


Psyop Strategy is a buy back bot that utilizes all the developer wallet fees to reinject after every 30% dip utilizing a price node with Dexscreener's api
