from flask import Flask,jsonify,render_template,url_for
import re, spacy, os
from flask import request
import json
import spacy
from spacy import displacy
from flask_cors import CORS
from flaskext.markdown import Markdown
nlp = spacy.load('en_core_web_sm')


app = Flask(__name__)
Markdown(app)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/extract", methods=["GET", "POST"])
def nlpProcess():
        if request.method == 'POST':
            rawtext= request.form['rawtext'] 
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
                  formatJ = json.dumps({'Annotation':{"start": z, "end":w,'label': y ,'Text': x}}, indent = 2)
                  print (formatJ)
                  return render_template('results.html', rawtext=rawtext,results = results,y=y, formatJ = json.dumps({'document':str(doc)})+formatJ)
            else:
                return render_template('results.html', rawtext=rawtext,results = results)

if __name__=="__main__":
    app.run(debug=True)