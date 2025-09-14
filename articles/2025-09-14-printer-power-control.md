---
layout: post
title: ???
description: ???
createdAt: 2024-11-23
permalink: /blog/2025-09-14-printer-power-control.html
tags:
  - 3d print
  - printer
  - klipper
  - moonraker
---

```ini
# Control a relay providing power to the printer
# @see https://moonraker.readthedocs.io/en/latest/configuration/#options-common-to-all-power-devices
[power printer]
type: gpio
pin: gpio17
initial_state: off
off_when_shutdown: False
locked_while_printing: True
on_when_job_queued: True
restart_klipper_when_powered: True
```

## Джерела
- https://moonraker.readthedocs.io/en/latest/configuration/#options-common-to-all-power-devices
