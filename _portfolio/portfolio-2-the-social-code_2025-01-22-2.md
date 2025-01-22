---
title: "Evaluation of the Use of LLM-Based Agents for Social Simulation"
excerpt: "<br/><img src='/images/2025-01-22-The_Social_Code/llm-net300X500.png'>"
collection: portfolio
---

### 1. **Brief Summary**
This project evaluates the reliability of using Large Language Model (LLM) agents to simulate human social behaviors for network analysis. It emphasizes a unique edge-level precision approach instead of focusing solely on overall network structure, addressing how well LLM-generated networks replicate real-world social dynamics.



### 2. **Context**
- **Conducted at**: UC Berkeley (Network In Context Lab)
- **Supervisors**: Byungkyu Lee and David Broska
- **Project Type**: Research project initially developed as coursework and later extended in a research lab.
- **Focus**: Leveraging LLMs to simulate social networks for affordable, risk-free, and efficient alternatives to human-based studies.



### 3. **Target Problem**
The study investigates whether networks formed by LLM agents accurately reflect real-world human networks. Specifically:
- How reliable are LLMs in simulating human-like network structures?
- Can factors affecting human network formation (e.g., demographics) also influence LLM-generated networks?



### 4. **Method**
#### 4.1 **Pure Simulation Approach**
- **Interaction Mechanism Design**:
  - Developed prompts for generating agent attributes (e.g., name, gender, race, age) and initiating conversations.
  - Simulated conversations between agents to form interaction-based social ties.
  - Designed specific prompts to evaluate friendship preferences and interaction dynamics.
- **Network Analysis**:
  - Studied agent-generated networks using metrics like centrality and clustering coefficients.
  - Investigated homophily factors (e.g., shared demographics) influencing network formation.

#### 4.2 **Data-Grounded Simulation Approach**
- **Dataset Utilized**:
  - Indian village microfinance dataset comprising demographic details (gender, caste, mother tongue) and relational data (e.g., borrowing money or seeking advice).
- **Preprocessing**:
  - Constructed a machine learning pipeline with logistic regression to identify influential demographic factors.
  - Applied balancing methods like SMOTE and ROSE to address data imbalance issues (i.e., sparse edges vs. non-existent edges).
  - Generated synthetic edges for network predictions.
- **Simulation Design**:
  - Generated LLM agent attributes matching the demographic distribution of the dataset.
  - Conducted multiple simulation rounds to predict network ties.
- **Validation Techniques**:
  - Used sequential, local, and global prediction methods to analyze network accuracy.
  - Compared simulated networks to real-world data on edge-level precision, density, and clustering coefficients.



### 5. **Results**
#### 5.1 **Findings from Pure Simulation**
- **Centralized Structures**: LLM-generated networks showed high centrality, unlike real-world decentralized structures.
- **Demographic Influence**: Factors like gender, race, and age played a minimal role in LLM agent networks compared to real-world patterns.
- **Memory Bias**: Agents prioritized earlier information in their memory retrieval system, creating biases in network formation.

#### 5.2 **Improvements via Data-Grounded Methods**
- **Demographic Representativeness**: Enhanced LLM agents’ demographic distributions (e.g., caste and religion).
- **Influential Variables**:
  - Identified caste, religion, and mother tongue as significant predictors of network ties.
  - Gender and age had a lesser impact compared to real-world observations.

#### 5.3 **Performance Comparison**
- **Global Method**:
  - Best at replicating overall network density and average degree.
  - Performed poorly in preserving local clustering coefficients.
- **Sequential Method**:
  - Achieved the highest edge-level precision (~30%).
  - Demonstrated better reliability than local methods.
- **Attribute Testing**:
  - Adding more demographic attributes did not significantly improve precision, recall, or F1 scores.

#### 5.4 **Key Insight**
While LLMs can generate structurally similar networks to real-world data, edge-level accuracy remains a challenge. This highlights potential risks in relying solely on LLM-based predictions for human-like social simulations.
