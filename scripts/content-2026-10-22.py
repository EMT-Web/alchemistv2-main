"""One-off content update, 22 Oct 2026 (kept for the record; safe to re-run: it
checks the current state before changing anything).

1. "7 Days Adventure through time and Culture" becomes 8 days: the itinerary
   already held 8 days (Day 5 appeared twice), so the days are renumbered, the
   missing Fes overnight is written in, and the inclusions count 7 nights
   (3 half board, 4 bed and breakfast, as each day already states).
2. "10 Days Journey of Culinary Exploration": Days 3 to 10 written out, drive
   times added for every day, price set to EUR 2,133 per person for 2 travellers.
"""
import json, uuid, re

P = 'data/cms/dataset.json'
docs = json.load(open(P))
key = lambda: uuid.uuid4().hex[:12]
text = lambda b: ''.join(c.get('text', '') for c in b.get('children', []))


def block(t, style='normal', bullet=False, bold=False):
    b = {'_key': key(), '_type': 'block', 'children': [{'_key': key(), '_type': 'span', 'marks': ['strong'] if bold else [], 'text': t}], 'markDefs': [], 'style': style}
    if bullet:
        b['listItem'] = 'bullet'; b['level'] = 1
    return b


def tour(slug):
    return next((d for d in docs if d['_type'] == 'tour' and d['slug']['current'] == slug), None)


cat = {d['title']: d['_id'] for d in docs if d['_type'] == 'category'}
dest = {d['title']: d['_id'] for d in docs if d['_type'] == 'destination'}

# ---------- 1. 7 day -> 8 day ----------
t = tour('7-days-adventure-through-time-and-culture-morocco')
if t:
    heads = [b for b in t['body'] if b.get('style') in ('h1', 'h2', 'h3') and re.match(r'\s*Day\s*\d', text(b))]
    assert len(heads) == 8, len(heads)
    for i, b in enumerate(heads, 1):
        s = b['children'][0]
        s['text'] = re.sub(r'^\s*Day\s*\d+', f'Day {i}', text(b))
        b['children'] = [s]
    # Day 5 (Fes city tour) had no overnight line; the evening escort to the riad puts it in Fes.
    body = t['body']
    i5 = body.index(heads[4]); i6 = body.index(heads[5])
    if not any('Overnight' in text(b) for b in body[i5:i6]):
        body.insert(i6, block('Overnight in Fes (BB)'))
    for b in body:
        for c in b.get('children', []):
            if c.get('text', '').startswith('Recommended accommodations for 6 nights'):
                c['text'] = 'Recommended accommodations for 7 nights (3 HB and 4 BB).'
    t['duration'] = 8
    t['title'] = '8 Days Adventure through Time and Culture in Morocco'
    t['seotitle'] = '8 Day Private Tour from Marrakech to Casablanca via the Sahara'
    t['seodescription'] = ('A private 8 day tour from Marrakech to Casablanca: the Dades Valley, two nights '
                           'in the Merzouga dunes, a guided day in Fes, Volubilis and Chefchaouen.')
    t['slug']['current'] = '8-days-adventure-through-time-and-culture-morocco'
    for c in t['categories']:
        if c['_ref'] == cat['3-7 day tours']:
            c['_ref'] = cat['1-2 Week Tours']
    t['priceSource'] = (t.get('priceSource', '') + '; TourRadar listing still shows the 7 day version').strip('; ')

# ---------- 2. 10 day culinary tour ----------
t = tour('10-days-journey-of-culinary-exploration')
if t and len([b for b in t['body'] if re.match(r'\s*Day\s*\d', text(b))]) < 10:
    days = [
        ('Day 3: Ouirgane to Marrakech: The Medina and its Food Souks',
         ['After breakfast with your hosts, drive down from the Ouirgane valley to Marrakech. The afternoon is for the old medina: the Koutoubia Mosque, the Bahia Palace and the lanes of spice, olive and pastry stalls that lead into Jemaa el Fna square.',
          'As evening falls, the square fills with food stalls, musicians and storytellers, and your guide can point you to the dishes Marrakech is known for, such as tanjia slow cooked in the embers of the hammam ovens.'],
         'Overnight in Marrakech'),
        ('Day 4: Marrakech to the Dades Valley via the Tizi n\'Tichka Pass and Ait Ben Haddou',
         ['Cross the High Atlas over the Tizi n\'Tichka pass, the highest road pass in Morocco at 2,260 m, with Berber villages and terraced fields along the way.',
          'Stop at the fortified village of Ait Ben Haddou, a UNESCO World Heritage site, then continue past Ouarzazate and the Skoura oasis along the Road of a Thousand Kasbahs to the Dades Valley.'],
         'Overnight in the Dades Valley'),
        ('Day 5: Dades Valley to Merzouga via the Todra Gorge',
         ['Drive through the Dades Valley to Tinghir and walk into the Todra Gorge, where the canyon walls rise around 300 m above the river.',
          'Continue through Erfoud to Merzouga at the edge of the Erg Chebbi dunes. Ride a camel into the dunes for sunset and spend the night in a desert camp under the stars.'],
         'Overnight in a desert camp in Merzouga'),
        ('Day 6: A Day in the Merzouga Desert',
         ['Wake early for sunrise over the dunes. The day is spent exploring the desert around Erg Chebbi: a visit to a nomad family for tea, the village of Khamlia and its Gnawa music, and the seasonal lake where flamingos gather when there is water.',
          'In nearby Rissani, the old caravan town, the market is the place to try madfouna, the stuffed bread often called Berber pizza. Return to the camp for a second night in the desert.'],
         'Overnight in a desert camp in Merzouga'),
        ('Day 7: Merzouga to Ouarzazate via the Draa Valley',
         ['Leave the dunes and head west through Alnif and N\'Kob into the Draa Valley, a long ribbon of date palms and earthen kasbahs.',
          'Arrive in Ouarzazate, the gateway to the Sahara and home of Morocco\'s film studios, with time to see the Taourirt Kasbah.'],
         'Overnight in Ouarzazate'),
        ('Day 8: Ouarzazate to Marrakech over the High Atlas',
         ['Cross back over the Tizi n\'Tichka pass to Marrakech, with stops for views of the High Atlas and the argan oil cooperatives on the northern side of the pass.',
          'The rest of the afternoon is free in Marrakech: the Majorelle Garden, the souks or a hammam.'],
         'Overnight in Marrakech'),
        ('Day 9: Marrakech to Essaouira on the Atlantic Coast',
         ['Drive west across the plains, through argan country, to Essaouira, the walled port town on the Atlantic.',
          'Walk the ramparts and the medina, a UNESCO World Heritage site, and go down to the harbour, where the day\'s catch is grilled at the fish stalls by the port.'],
         'Overnight in Essaouira'),
        ('Day 10: Essaouira to Marrakech Airport',
         ['Enjoy a last morning by the sea, then drive back to Marrakech for your transfer to Marrakech Menara airport, where your private tour ends.'],
         None),
    ]
    for title, paras, overnight in days:
        t['body'].append(block(title, 'h3'))
        for p in paras:
            t['body'].append(block(p))
        if overnight:
            t['body'].append(block(overnight, bullet=True))
    t['body'].append(block('Notes:'))
    t['body'].append(block('This is a private tour for you and your travelling companions only; you never share the vehicle or guide with other travellers.', bullet=True))
    t['body'].append(block('Accommodation, meals and the order of the days can be tailored when you enquire.', bullet=True))
    t['driveTimes'] = [
        {'km': 60, 'minutes': 75, 'from': 'Marrakech', 'to': 'Ouirgane'},
        None,
        {'km': 60, 'minutes': 75, 'from': 'Ouirgane', 'to': 'Marrakech'},
        {'km': 330, 'minutes': 390, 'from': 'Marrakech', 'to': 'Dades Valley', 'via': 'Ait Ben Haddou and Ouarzazate'},
        {'km': 280, 'minutes': 270, 'from': 'Dades Valley', 'to': 'Merzouga', 'via': 'Todra Gorge'},
        None,
        {'km': 370, 'minutes': 360, 'from': 'Merzouga', 'to': 'Ouarzazate', 'via': 'the Draa Valley'},
        {'km': 200, 'minutes': 240, 'from': 'Ouarzazate', 'to': 'Marrakech', 'via': "the Tizi n'Tichka pass"},
        {'km': 190, 'minutes': 165, 'from': 'Marrakech', 'to': 'Essaouira'},
        {'km': 190, 'minutes': 165, 'from': 'Essaouira', 'to': 'Marrakech airport'},
    ]
    have = {r['_ref'] for r in t['destinations']}
    for name in ['Boumalne Dades and the Valley of Roses']:
        if dest[name] not in have:
            t['destinations'].append({'_key': key(), '_ref': dest[name], '_type': 'reference'})
    t['seotitle'] = '10 Day Private Morocco Food and Trekking Tour from Marrakech'
    t['seodescription'] = ('A private 10 day tour from Marrakech: a homestay and cooking class in the High Atlas, '
                           'two nights in the Merzouga dunes, the Draa Valley and the Essaouira coast.')
    t['heroparagraph'] = ('A private 10 day journey from Marrakech built around food, walking and village life: two nights '
                          'with a family in Ouirgane in the High Atlas, with a trek and a cooking class, then across the '
                          'mountains to the Dades Valley, two nights in the Merzouga dunes, the Draa Valley and Ouarzazate, '
                          'and a last night by the sea in Essaouira.')

if t:
    t['priceFrom'] = 2133
    t['priceCurrency'] = 'EUR'
    t['priceTravellers'] = 2
    t.pop('priceEstimated', None)
    t['priceSource'] = 'Set by Escorted Morocco Tours on 22 Oct 2026: EUR 2,133 per person based on 2 travellers (EUR 4,266 total for 2)'

json.dump(docs, open(P, 'w'), ensure_ascii=False, separators=(',', ':'))
print('done')
