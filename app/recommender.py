import numpy as np
import pandas as pd
from functools import reduce
from ast import literal_eval
import sqlite3
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rake_nltk import Rake


# 1. collect data from the .csv file
df = pd.read_csv('dataset/Movies_cleaned.csv')
df = df[['title', 'genres', 'director', 'actors', 'overview']]
# print(df.head())

# 2. data cleaning
#    Since the attribute 'overview' contains many words, we need to extract some keywords out of it.
#    We use the feature of the 'nltk' ackage to perform this job
#    We assign the keywords of the 'overview' of each movie to a new col 'keywords'

df['keywords'] = ""

for index, row in df.iterrows():
    overview = row['overview']

    # here we start Rake
    # it uses english stopwords and get rid of all the puntuations
    # then it extracts some
    r = Rake()
    r.extract_keywords_from_text(overview)

    # getting the dictionary whith keywords as keys and their scores as values
    key_words_dict_scores = r.get_word_degrees()

    # assigning the key words to the new column for the corresponding movie
    row['keywords'] = list(key_words_dict_scores.keys())

# dropping the 'overview' column
df.drop(columns=['overview'], inplace=True)

# print(df.info())
# print(df['keywords'])


df['genres'] = df['genres'].map(lambda x: x.split(','))
df['actors'] = df['actors'].map(lambda x: x.split(',')[:5])
df['director'] = df['director'].map(lambda x: x.split(','))
for index, row in df.iterrows():
    row['genres'] = [x.lower().replace(' ', '') for x in row['genres']]
    row['actors'] = [x.lower().replace(' ', '') for x in row['actors']]
    row['director'] = [x.lower().replace(' ', '') for x in row['director']]

# print(df.iloc[0])


df['list_of_words'] = ''
columns = ['genres', 'director', 'actors', 'keywords']
for index, row in df.iterrows():
    words = ''
    for col in columns:
        words += ' '.join(row[col]) + ' '
    row['list_of_words'] = words

df = df[['title', 'list_of_words']]


# pd.set_option('display.max_rows', None)
# pd.set_option('display.max_columns', None)
# pd.set_option('display.width', None)
# pd.set_option('display.max_colwidth', -1)
# print(df.iloc[0])

# https://www.quora.com/What-is-the-difference-between-TfidfVectorizer-and-CountVectorizer-1
# In TfidfVectorizer we consider overall document weightage of a word.
# It helps us in dealing with most frequent words.
# Using it we can penalize them.
# TfidfVectorizer weights the word counts by a measure of how often they appear in the documents.

count = CountVectorizer()
# count = TfidfVectorizer()
count_matrix = count.fit_transform(df['list_of_words'])

# generating the cosine similarity matrix
cosine_sim = cosine_similarity(count_matrix, count_matrix)

# creating a Series for the movie titles so they are associated to an ordered numerical
# list I will use in the function to match the indexes
indices = pd.Series(df['title'])

#  defining the function that takes in movie title
# as input and returns the top n recommended movies


def recommend(title, cosine_sim=cosine_sim):
    recommended_movies = []
    idx = indices[indices == title].index[0]
    # creating a Series with the similarity scores in DESC order
    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=False)

    # getting the indexes of the n most similar movies
    top_5_indexes = list(score_series.iloc[1:5].index)

    # populating the list with the titles of the best 5 matching movies
    for i in top_5_indexes:
        recommended_movies.append(list(df['title'])[i])

    return recommended_movies


# print(recommend('Hulk'))
