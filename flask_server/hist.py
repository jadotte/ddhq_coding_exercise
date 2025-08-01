import pandas as pd
import numpy as np
import collections
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns
import string
import io


def get_bigrams(text: str) -> pd.DataFrame:
    """
    Gets a list of bigrams from input string
    """
    text = text.translate(str.maketrans("", "", string.punctuation))
    words = text.lower().split()
    if len(words) < 2:
        return {}
    bigrams = {}
    for i, w in enumerate(words[:-1]):
        curr = ",\n".join(sorted([w, words[i + 1]]))
        bigrams[curr] = bigrams.get(curr, 0) + 1
    bigrams = pd.DataFrame(bigrams.items(), columns=["Bigram", "Frequency"])
    sorted_bigrams = bigrams.sort_values(by="Frequency", ascending=False)
    return sorted_bigrams


def plot_histogram(bigrams: pd.DataFrame, breadth=20):
    """
    Plots the histogram of the frequency of inputted bigrams
    """
    buf = io.BytesIO()
    plt.figure(figsize=(20, 12))
    sns.set(font_scale=1.5)
    sns.barplot(data=bigrams.head(breadth), y="Frequency", x="Bigram")
    plt.title("Bigram Histogram", fontsize=40)
    plt.xlabel("Frequency", fontsize=32)
    plt.ylabel("Bigram", fontsize=32)
    plt.tight_layout()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)
    return buf
