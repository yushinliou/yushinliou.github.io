---
coverImage:
  src: "@/assets/2025-01-22-The Price_of_Closeness/head.png"
  alt: "Social network visualization showing triadic closure patterns"
title: "The Price of Closeness: Answering How Popularity and Close Social Circles Limit People Meet New People On Social Media"
description: "Examining how social media dynamics, particularly popularity and tightly-knit social circles, influence opportunities for forming new connections through triadic closure analysis."
tags: ["academic research", "social networks analysis", "data analysis", "social media", "quantitative research"]
tabs: ["home", "research"]
category: "Research"
lang: "en"
isDraft: true
isCJKLanguage: false
publishDate: 2025-01-22
year: 2023
role: "Lead Researcher"
---

<!--
### 1. **Brief Summary**
This project examines how social media dynamics, particularly popularity and tightly-knit social circles, influence opportunities for forming new connections. By analyzing triadic closure using survival analysis on Facebook interaction data, it challenges the traditional notion that popularity and close social circles are purely advantageous, revealing their constraining effects. -->

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/networking.png)

> Is lack of a close social circle really a bad thing?

# Context

Do you have a tight social circle on social media? Or do you consider yourself a popular person on it? Existed works often sees having a close social circle and being popular as an advantage, as they may indicate social support and power. In this work, I want to challenge this view by showing the potential benefit of lack of close social circles.


- **Conducted at**: National Taiwan University
- **Supervisor**: Prof. Hsuan-Wei Lee
- **Project Type**: B.A. thesis
- **Outcome**: Paper under review at *Sociological Science*


<!-- ### M
Previous studies celebrate popularity and close social circles for providing social support and power. However, this project investigates:
- Whether these advantages limit users' ability to form new ties.
- How factors like local clustering coefficients (LCC) and actor popularity interact to influence network expansion through triadic closure. -->



# Method

## Triadic Closure

We use triadic closure to express the expansion of network:

* Ego: the focal person we consider
* Degree-1 alter (d1): who have directed connection with ego
* Degree-2 alter (d2): Who connect with d1 but not directly connect with ego

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/nw-expand.png)

## Local Clustering Coefficient(LCC)

* We use local clustering coefficient(LCC) to measure the closeness of a social circle:
  * High LCC: Most of actor's friend know each other
  * The Actor has a close social circle

$$LCC=\frac{\text{𝑇ℎ𝑒 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑒𝑑𝑔𝑒𝑠 𝑏𝑒𝑡𝑤𝑒𝑒𝑛 𝑛𝑒𝑖𝑔ℎ𝑏𝑜𝑟𝑠}}{\text{𝑇ℎ𝑒 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑝𝑜𝑠𝑠𝑖𝑏𝑙𝑒 𝑒𝑑𝑔𝑒𝑠 𝑏𝑒𝑡𝑤𝑒𝑒𝑛 𝑛𝑒𝑖𝑔ℎ𝑏𝑜𝑟𝑠}}$$

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/nw-closure.png)

## Hypotheses

- Hypothesis 1 The interplay between Ego LCC and d2 LCC
   - Lower local clustering(sparse network) within an ego-centric network increases the likelihood of the ego initiating contact with a degree-2 alter, particularly when the degree-2 alter is have a close social circle.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/h1.png)

- Hypothesis 2 The interplay between Ego LCC and d1 LCC
   - The likelihood of triadic closure between degree-1 alters increase as the local clustering coefficient of the degree-1 alters decreases. However, high local clustering of the ego moderates this effect, limiting the formation of new ties.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/h2.png)

- Hypothesis 3 The interplay between Ego LCC and d2 Popularity
   - Higher popularity of a degree-2 alter increases the likelihood of triadic closure, but this effect is weakened by the ego's high local clustering coefficient, as dense clusters restrict outreach to new ties.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/h3.png)

- Hypothesis 4 The interplay between Ego LCC and d1 Popularity
   - Higher popularity of a degree-1 alter increases the likelihood of triadic closure, but this effect is weakened by the ego's high local clustering coefficient, as dense clusters restrict outreach to new ties.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/h4.png)


## Data Collection

- Random sampling colege graduates from the class of 2016 from universities across Taiwan
- Background survey: Asking students to completed an online questionnaire
- Asking student to authorized access to their Facebook usage records
- Web crawlers were used to retrieve interaction records from their Facebook homepages

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/method-data-icon.png)

> Filter out the classes response rate < 70%
> Getting both online and offline information

- **Participants**: 919 college graduates from Taiwan (Class of 2016).
- **Data Sources**:
  - Facebook interaction records over 668 days (freshman to junior years).
  - Surveys capturing demographics, personality traits, and offline interactions.
- **Triad Sampling**:
  - 21,900 triads were extracted for analysis based on interaction data.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/method-data-number.png)


## Model: Survival Analysis

- Unit of analysis: triad.
- Dependent Variable: Time to triadic closure or end of observation period.
- Independent Variables: LCC, popularity, and interaction terms.
- Control Variables: Gender, extroversion, and shared neighbors.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/method-survival.png)


# Results

## Hypothesis 1

1. Ego are more likely to initiated contact d2 when they don't have a close social circle
2. Ego especialy prefer those d2 who also don't have a close social circle



![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/res-h1.png)

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/res-1.png)

## Hypothesis 2

1. Ego prefer popular d2
2. Those ego who don't have a close social circle are most likely to be appeal by popular d2

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/res-h2.png)

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/res-2.png)

## Hypothesis 3

1. d1 are more likely to contact another d1 when they don't have a close social circle (low LCC)
2. Old d1, which means those who know ego earlier are more passive on initiating contact to new d1 when ego already have a close social circle
3. However, for new d1 tend to take initiative if ego have a close social circle (When ego LCC > 0.4)

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/res-h3.png)

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/result-3.png)

## Hypothesis 4

1. A popular d1 would be more likely to take initiative, while another d1 would also tend to be proactive
2. For new d1, Ego's LCC stronger the effect of popularity.
3. However, for for old d1, Ego's LCC weaken the effect of popularity

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/res-h4.png)

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/result-4.png)


# Conclusion

> A presumably disadvantaged low degree of local clustering actualy helps expand one's network by encouraging new social ties.
<!-- > ![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/pos-and-neg.png) -->
> Although it limits the access to tightly bound social groups and highly popular actors.

![Icon representing a visually impaired person](../../assets/2025-01-22-The%20Price_of_Closeness/sum.png)
