const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/aapi', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://geo-foncier.aapi.dz/server/rest/services/Version3/Fonciers_economique_affichage_v3/FeatureServer/5/query',
      { params: {
          f: 'json',
          where: '1=1',
          returnGeometry: 'false',
          resultRecordCount: '200',
          outFields: 'fo_code,fo_categorie,fo_region,wilaya,commune,fo_adresse,fo_superficie,fo_bati_superficie,pub_debut_date,pub_fin_date,activites1,produits1,lebelle1,lebelle2,lebelle3,activites'
      }}
    );
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Proxy AAPI démarré'));
