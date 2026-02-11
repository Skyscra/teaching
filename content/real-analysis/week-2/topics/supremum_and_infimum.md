---
title: "Supremum und Infimum"
order: 1
description: "Die kleinste aller oberen Schranken: One to rule them all."
---

Willkommen in der "Erwachsenenwelt" der Analysis. In der Schule hast du gelernt, dass Mengen ein Maximum oder Minimum haben. Aber was passiert, wenn wir eine Menge wie das offene Intervall $(0, 1)$ betrachten? Es gibt keine größte Zahl, die kleiner als 1 ist. Hier kommen Supremum und Infimum ins Spiel. Sie füllen die Lücken, die Maximum und Minimum hinterlassen.

## 1. Das Konzept der Schranken

### Intuition
Bevor wir das Supremum finden, müssen wir verstehen, was eine Schranke ist. Stell dir vor, du hast eine Herde Schafe (deine Menge an Zahlen) auf einer Wiese. Ein Zaun, der die Schafe daran hindert, nach Norden zu laufen, ist eine obere Schranke. Dieser Zaun kann direkt an der Weide stehen oder fünf Kilometer entfernt. Beides hält die Schafe auf. Jede Zahl, die größer oder gleich allen Elementen deiner Menge ist, ist eine solche obere Schranke.

![](/real-analysis/week-2/supremum_and_infimum/intuition.png)


### Definition
> [!DEFINITION]
> Definition 1.1 (Obere Schranke): Sei $A \subset \mathbb{R}$ eine nichtleere Menge. Eine Zahl $b \in \mathbb{R}$ heißt obere Schranke von $A$, wenn für alle $x \in A$ gilt: $x \leq b$.

### Beispiel
Betrachte das Intervall $A = [0, 5]$. Die Zahl 5 ist eine obere Schranke. Die Zahl 100 ist ebenfalls eine obere Schranke. Die Zahl $\pi^2$ ist auch eine. Es gibt unendlich viele obere Schranken.

### Gegenbeispiel
Die Menge der natürlichen Zahlen $\mathbb{N} = \{1, 2, 3, \dots\}$ besitzt keine obere Schranke in $\mathbb{R}$. Egal wie groß die Zahl $b$ ist, die du wählst, es gibt immer ein $n \in \mathbb{N}$, das größer ist als $b$ (Archimedisches Axiom). Die Menge ist nach oben unbeschränkt.

## 2. Supremum (Die kleinste obere Schranke)

### Intuition
Wir haben gesehen, dass eine Menge viele Zäune (Schranken) haben kann. Das Supremum ist der engste mögliche Zaun. Stell dir vor, du senkst eine Decke von oben auf deine Zahlenmenge herab. Das Supremum ist genau die Höhe, auf der die Decke liegen bleibt, weil sie die "Spitze" der Menge berührt. Es darf keinen Luftspalt mehr zwischen der Schranke und der Menge geben.

### Definition
> [!DEFINITION]
> Definition 2.1 (Supremum): Sei $A \subset \mathbb{R}$ nach oben beschränkt. Eine Zahl $s \in \mathbb{R}$ heißt Supremum von $A$ (geschrieben $\sup A$), wenn gilt:
> 1. $s$ ist eine obere Schranke von $A$.
> 2. Für jede beliebige obere Schranke $b$ von $A$ gilt $s \leq b$.

Das bedeutet: $s$ ist die kleinste obere Schranke. In der Praxis nutzen wir oft folgende äquivalente Charakterisierung, um zu beweisen, dass $s$ das Supremum ist:

> [!LEMMA]
> Lemma 2.2 ($\varepsilon$-Kriterium): Eine obere Schranke $s$ ist genau dann das Supremum von $A$, wenn gilt: $$ \forall \varepsilon > 0 \quad \exists a \in A \quad \text{sodass} \quad a > s - \varepsilon $$

Das heißt: Wenn du vom Supremum auch nur ein winziges Stückchen $\varepsilon$ nach unten gehst, ist das keine obere Schranke mehr, weil du sofort ein Element aus $A$ findest, das höher liegt.

### Beispiel
Sei $A = \{ 1 - \frac{1}{n} : n \in \mathbb{N} \} = \{0, 0.5, 0.66\dots, 0.75, \dots\}$.
Wir vermuten $\sup A = 1$.
1. Ist 1 eine obere Schranke? Ja, denn $1 - \frac{1}{n} < 1$ für alle $n$.
2. Ist es die kleinste? Wähle ein beliebiges $\varepsilon > 0$. Wir müssen zeigen, dass $1 - \varepsilon$ keine Schranke ist. Wir suchen also ein $n$, sodass $1 - \frac{1}{n} > 1 - \varepsilon$. Das ist äquivalent zu $\frac{1}{n} < \varepsilon$ oder $n > \frac{1}{\varepsilon}$. Da wir immer so ein natürliches Zahl $n$ finden können, ist 1 tatsächlich das Supremum.

![](/real-analysis/week-2/supremum_and_infimum/example.png)

### Gegenbeispiel
Betrachte die Menge $A = \{ x \in \mathbb{Q} : x^2 < 2 \}$. Wir suchen das Supremum in der Menge der rationalen Zahlen $\mathbb{Q}$. Das Problem ist: Es gibt keine rationale Zahl $q$, deren Quadrat genau 2 ist. Die "Lücke", wo $\sqrt{2}$ sein sollte, ist in $\mathbb{Q}$ nicht definiert. Daher hat diese Menge in $\mathbb{Q}$ kein Supremum. Das ist der Grund, warum wir Analysis in $\mathbb{R}$ betreiben – $\mathbb{R}$ ist "vollständig", dort existiert das Supremum $\sqrt{2}$.

![](/real-analysis/week-2/supremum_and_infimum/counter_example.png)

## 3. Unterschied zu Maximum und Minimum

### Intuition
Das Maximum ist ein "Mitglied des Clubs", das Supremum ist nur der "Türsteher". Ein Maximum muss Teil der Menge sein. Ein Supremum kann Teil der Menge sein, muss es aber nicht. Wenn ein Maximum existiert, ist es automatisch auch das Supremum. Wenn kein Maximum existiert, kann das Supremum trotzdem existieren (und tut es in $\mathbb{R}$ auch immer für beschränkte Mengen).

### Satz
> [!THEOREM]
> Satz 3.1: Sei $A \subset \mathbb{R}$ beschränkt.
> 1. Wenn $A$ ein Maximum hat, dann gilt $\max A = \sup A$.
> 2. Das Supremum existiert immer (Vollständigkeitsaxiom), das Maximum nicht unbedingt.

### Beispiel
Sei $A = [0, 1]$. Das Intervall ist abgeschlossen. Die Zahl 1 gehört dazu.
$\max A = 1$ und $\sup A = 1$.

### Gegenbeispiel (Pathologischer Pfad)
Sei $A = (0, 1)$. Das Intervall ist offen. Die Zahl 1 gehört *nicht* dazu.
$\sup A = 1$, aber $\max A$ existiert nicht.
Warum? Angenommen $m \in (0, 1)$ wäre das Maximum. Dann ist $m < 1$. Die Zahl $\frac{m+1}{2}$ liegt genau zwischen $m$ und 1. Sie ist also größer als $m$, aber immer noch in $A$. Widerspruch dazu, dass $m$ das Größte war.

## Übungen

1. Bestimme, falls existent, Infimum, Supremum, Minimum und Maximum der Menge $M = \{ \frac{1}{n} + (-1)^n : n \in \mathbb{N} \}$.
2. Wahr oder Falsch? Jede endliche, nichtleere Teilmenge von $\mathbb{R}$ hat ein Supremum, das gleichzeitig ihr Maximum ist.
3. Seien $A, B \subset \mathbb{R}$ beschränkte Mengen mit der Eigenschaft $\forall a \in A, \forall b \in B: a \le b$. Zeige, dass $\sup A \le \inf B$.