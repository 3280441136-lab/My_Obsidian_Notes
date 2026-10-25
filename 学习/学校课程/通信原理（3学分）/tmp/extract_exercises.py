from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
import json
ROOT=Path.cwd()
OUT=ROOT/'tmp'/'exercise-work'
OUT.mkdir(exist_ok=True)
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','m':'http://schemas.openxmlformats.org/officeDocument/2006/math','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def tag(n): return E.QName(n).localname
def conv(n):
    t=tag(n)
    if t in ('t',):return n.text or ''
    if t in ('sSub','sSup','sSubSup'):
        a={tag(c):conv(c) for c in n if not tag(c).endswith('Pr')}
        return a.get('e','')+('_{'+a['sub']+'}' if 'sub' in a else '')+('^{'+a['sup']+'}' if 'sup' in a else '')
    if t=='f':
        a={tag(c):conv(c) for c in n}; return '\\frac{'+a.get('num','')+'}{'+a.get('den','')+'}'
    if t=='rad':return '\\sqrt{'+''.join(conv(c) for c in n if tag(c)=='e')+'}'
    if t=='d':return '('+''.join(conv(c) for c in n if tag(c)=='e')+')'
    if t.endswith('Pr'):return ''
    if t in ('tab','br'):return ' '
    if t=='blip':return '[IMAGE '+n.get('{'+NS['r']+'}embed','')+']'
    return ''.join(conv(c) for c in n)
index=[]
for folder in ['第二讲','第三讲','第四讲','第五讲','第六讲']:
 for p in sorted((ROOT/'PPT'/folder).glob('*.docx')):
    key=folder+'-'+p.stem.strip()
    dest=OUT/key;dest.mkdir(exist_ok=True)
    with ZipFile(p) as z:
        root=E.fromstring(z.read('word/document.xml'))
        rel=E.fromstring(z.read('word/_rels/document.xml.rels'))
        rels={x.get('Id'):x.get('Target') for x in rel}
        pars=[]
        for i,el in enumerate(root.xpath('//w:body/w:p | //w:body/w:tbl//w:p',namespaces=NS)):
            s=conv(el).strip()
            if s: pars.append(f'{i:03d} {s}')
        (dest/'text.txt').write_text('\n'.join(pars),encoding='utf-8')
        imgs=[]
        for name in z.namelist():
            if name.startswith('word/media/'):
                target=dest/Path(name).name;target.write_bytes(z.read(name));imgs.append(target.name)
        (dest/'rels.json').write_text(json.dumps(rels,ensure_ascii=False,indent=2),encoding='utf-8')
        index.append({'source':str(p.relative_to(ROOT)),'key':key,'images':imgs,'paragraphs':len(pars)})
(OUT/'index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(index,ensure_ascii=False,indent=2))
