---
title: "Week 5"
week: 5
date: "2026-02-11"
description: "Stetigkeit und Differenzierbarkeit (Dummy)."
---

## Motivation

Diese Woche sammelt kurze Notizen zu Stetigkeit und Differenzierbarkeit. Die
Beispiele sind Platzhalter und dienen nur der Struktur.

> [!DEFINITION]
> Eine Funktion $f$ ist stetig in $x_0$, wenn für jede Folge $(x_n)$ mit
> $x_n \to x_0$ auch $f(x_n) \to f(x_0)$ gilt.

## Differenzierbarkeit

Die klassische Definition lautet:

$$
f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}
$$

> [!THEOREM]
> Differenzierbarkeit impliziert Stetigkeit.

### Skizze

> [!PROOF]
> Aus dem Grenzwert der Differenzen folgt direkt die Grenzwertbeziehung für
> $f(x)$ in $x_0$.

> [!NOTE]
> In der Praxis reicht oft eine lokale Abschätzung, um Stetigkeit zu zeigen.

## Warnung

> [!WARNING]
> Eine stetige Funktion ist nicht notwendigerweise differenzierbar.
