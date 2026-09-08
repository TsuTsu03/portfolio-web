---
title: "How I model courier COD reconciliation"
description: "A field-oriented explanation of shipment lifecycle data, proof of delivery and cash-on-delivery obligations in a logistics system."
summary: "COD reconciliation becomes easier to inspect when the cash obligation stays attached to the shipment that created it."
topic: "Logistics operations software"
published: 2026-09-09
updated: 2026-09-09
relatedWork:
  - "biyahero-express"
keywords:
  - "courier software"
  - "COD reconciliation"
  - "shipment lifecycle"
  - "proof of delivery"
  - "operations systems"
---

The short answer is to treat cash on delivery as an obligation created by a shipment,
not as a separate number entered during end-of-day reporting. The shipment remains the
thread that connects booking, dispatch, delivery evidence, collection and remittance.

## One record should carry the operational chain

Courier work crosses several people and locations. A booking becomes an assignment, the
assignment becomes a delivery attempt and a completed delivery can create proof and a
cash obligation. Splitting those stages into disconnected records makes reconciliation
a manual matching exercise.

In Biyahero Express, lifecycle stages stay attached to one shipment. That gives dispatch
and finance the same account of what happened instead of separate versions that need to
be compared later.

## Cash remains open until remittance

A delivered parcel and a remitted collection are not the same event. The model keeps
cash collected in the field outstanding until its remittance is recorded. The system can
then ask which deliveries created money that has not yet returned to the business.

This is more useful than a general cash total because every balance still points to the
shipment, driver activity and delivery proof that produced it.

## Dashboards should read the working data

An operational dashboard loses value when it reports from a copied dataset that lags
behind dispatch. Biyahero Express builds its status and reconciliation views from the
same records used by the workflow.

That choice keeps the interface honest. A late remittance remains visible as an open
obligation. A delivery without proof cannot quietly inherit the appearance of a complete
one.

## The design question I ask first

Before drawing the dashboard, I trace what must remain accountable after each handoff.
For courier COD, the answer is the shipment, its status, its evidence and the money it
created. The related case study documents the implementation and the exact parts I owned.
