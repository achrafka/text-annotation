from flask import Flask,jsonify,render_template,url_for
import re, spacy, os
from flask import request
import json
import spacy
from spacy import displacy
from flask_cors import CORS
from flaskext.markdown import Markdown
nlp = spacy.load('en_core_web_sm')
ff = spacy.explain('LOC')
print(ff)
app = Flask(__name__)
Markdown(app)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

@app.route("/")
def index():
    return render_template('index.html', data =[{'name':'NORP'},
                                                {'name':'FAC'},
                                                {'name':'ORG'},
                                                {'name':'GPE'},
                                                {'name':'LOC'},
                                                {'name':'PRODUCT'},
                                                {'name':'EVENT'},
                                                {'name':'WORK_OF_ART'},
                                                {'name':'LAW'},
                                                {'name':'LANGUAGE'},
                                                {'name':'DATE'},
                                                {'name':'TIME'},
                                                {'name':'PERCENT'},
                                                {'name':'PERSON'},
                                                {'name':'MONEY'},
                                                {'name':'QUANTITY'},
                                                {'name':'ORDINAL'},
                                                {'name':'CARDINAL'}])

@app.route("/extract", methods=["GET", "POST"])
def nlpProcess():
        if request.method == 'POST':
            rawtext= request.form['rawtext']
          
            labs= request.form.get('lab_s')
            print(list(labs))
            doc = nlp(rawtext)
            html = displacy.render(doc, style="ent")
            results = html
            if len(doc.ents) > 0:
              for word in doc.ents:
                  y=''
                  x = word.text
                  y = word.label_ + y
                  z = word.start_char
                  w = word.end_char
                  print(type(y))
                  if y == labs:
                    formatJ = json.dumps({'Annotation':{"start": z, "end":w,'label': y ,'Text': x}}, indent = 2)
                    print (formatJ)
                    return render_template('results.html', rawtext=rawtext,results = results,y=y, formatJ = json.dumps({'document':str(doc)})+formatJ)
          
              return labs + ' not found in '+rawtext              
            else:
                return render_template('results.html', rawtext=rawtext,results = results)
spacy.explain('LOC')
if __name__=="__main__":
    app.run(debug=True)