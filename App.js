import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- NAVİGASYON & TASARIM ---
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; 

// --- MOTİVASYON SÖZLERİ ---
const MOTIVASYON_SOZLERI = [
  "Başarı, vazgeçmeyenlerin ödülüdür.",
  "Bugün çalışmazsan, yarın hayal kurma.",
  "Ter dökmeden zafer kazanılmaz şampiyon!",
  "O üniversite kazanılacak, kaçarı yok!",
  "Rakiplerin uyurken sen çalışıyorsun.",
  "Hayallerin, bahanelerinden büyük olsun.",
  "Zirve tek kişiliktir, o da sensin.",
  "Her gün bir adım daha ilerle.",
  "Pes etmek, asla senin kelime hazinende olmasın.",
  "Azimle çalış, sabırla yeşer.",
  "Küçük hedefler bile büyük başarıların temelidir.",
  "Başarı, hazırlığın fırsatla buluştuğu yerdir.",
  "Düşmek sorun değil, önemli olan kalkabilmek.",
  "Kendi potansiyelini keşfetmek için sınırlarını zorla.",
  "Hedefin varsa, yolun da vardır.",
  "Başlamak, başarmanın yarısıdır.",
  "Her sabah yeni bir fırsat getirir.",
  "Zorluklar seni yıldırmasın, güçlendirsin.",
  "Bugün ne ekersen, yarın onu biçersin.",
  "İnanç + eylem = başarı.",
  "Başarı bir gecede gelmez, sabır ister.",
  "Hayallerine inan ve onları kovala.",
  "Çalışmak zor olabilir, ama pişmanlık daha da zor.",
  "Her hata bir öğrenme fırsatıdır.",
  "Korkularını geride bırak, hedefine yürü.",
  "Yarın, bugün yaptıklarının sonucu olacak.",
  "Disiplin, hayallerine giden köprüdür.",
  "Gücünü odakla, enerjini boşa harcama.",
  "Büyük hayal kur, büyük çalışmak gerek.",
  "Şimdi değilse ne zaman? Bir de dene.",
  "Yerinde saymak, gerilemek demektir.",
  "Sınırlarını sadece sen belirleyebilirsin.",
  "Kazanmak istiyorsan önce dene.",
  "Hayat, cesur adımlar atacak kadar cesurlara aittir.",
  "Başarı, cesaret edenlerin hikayesidir.",
  "Sonuçlar değil, süreç seni büyütür.",
  "Her düşüş bir sıçrama için fırsattır.",
  "Kararlılığın seni zirveye taşır.",
  "Yapabileceğine inan, fark yarat.",
  "Kendi rekorunu kırmak için yarış.",
  "Zamanı boşa harcama, her saniye kıymetli.",
  "Bugün verdiğin emek yarın seni anlatır.",
  "Başarı, disiplinin getirisidir.",
  "Hayatta sınavlar seni güçlendirir.",
  "Düşlerin büyük olabilir, sen daha büyüksün.",
  "Vazgeçmek kolaydır, kalmak zordur.",
  "Tutkun neyse, enerjini oraya yönlendir.",
  "Zorluklar, potansiyelinin işaretidir.",
  "Her engel, aşılmayı bekleyen bir köprüdür.",
  "Kendi hikayeni sen yaz.",
  "Geleceğini planla, bugün çalışarak inşa et.",
  "Küçük adımlar büyük yolculukları başlatır.",
  "Sabır + azim = efsane başarılara giden yol.",
  "Korkuların değil, hayallerin seni yönetsin.",
  "Her yeni gün, yeni bir başlangıçtır.",
  "Hedefine odaklan, dikkatini dağıtma.",
  "Zaman senin en büyük kaynağındır, boşa harcama.",
  "Başarı için önce kendine yatırım yap.",
  "Hayatlar zor ama sen daha güçlüsün.",
  "İnancın seni hareket ettirir.",
  "Çalışmak seni sınırlar ötesine taşır.",
  "Hayallerin peşinde koşarken yorulma, gelişiyorsun.",
  "Başarı yolunda sabırlı ol, acele etme.",
  "Her zorluğun ardından bir kolaylık vardır.",
  "Fırsatlar hazırlanmış zihinleri sever.",
  "İnandığın şey uğruna savaşmaktan korkma.",
  "Kendi potansiyeline asla sınır koyma.",
  "Düşün, planla, harekete geç.",
  "Motive ol, disiplinli ol, tekrarla.",
  "Bugün üşüsen de, yarın ısınacaksın.",
  "Çaba göster, terle, kazan.",
  "Geriye bakma, ileriye yürümeye devam et.",
  "Çok çalış, gülümse, tekrar çalış.",
  "Hayat kısa, hayallerin büyük olsun.",
  "Zirveye giden yol, terle döşelidir.",
  "Hayat senin elinde, ne yapacağına sen karar ver.",
  "Başarı bir yolculuktur, varış noktası değil.",
  "Sınırlarını genişletmek için her gün bir şey öğren.",
  "Başarı, küçük adımların toplamıdır.",
  "Kendi hikayeni olağanüstü yap.",
  "Dünya senin potansiyelini bekliyor.",
  "İmkansız, cesur kişiler için sadece bir kelimedir.",
  "Her gün yeniden başlama gücün var.",
  "Vazgeçersen asla bilemezsin.",
  "Hayat, emek verenlere gülümser.",
  "Başarının anahtarı çalışmaktır.",
  "Kendine güven, çünkü bunu hak ediyorsun.",
  "Yapabildiğinin en iyisini yapmak, her zaman büyük bir adımdır.",
  "Zorlu yol, büyük ödüller getirir.",
  "Korku, başarıya giden yoldaki engellerden biridir.",
  "Başarı için önce kendine inan.",
  "Her deneme seni bir adım ileri taşır.",
  "Çalışmak bir zorunluluk değil, ayrıcalıktır.",
  "Her sabah hayallerine bir adım daha yaklaş.",
  "Azim seni yıldızlara taşır.",
  "Hedefine giden yolu korkusuzca yürü.",
  "Başarı sabır ister, ama değeri paha biçilemez.",
  "Tutkuyla çalışmak, olağanüstü sonuçlar getirir.",
  "Hayat bir maratondur, acele etme ama durma.",
  "Engeller seni durdurmasın, seni şekillendirsin.",
  "Gücünü hayallerinden al.",
  "Cesur ol, sınırlarını aş.",
  "Her yeni sabah bir umut demektir.",
  "Düşüncelerinizi eyleme dönüştür.",
  "İmkansız diye bir şey yoktur, sadece denememiş olan var.",
  "Başarı için bir planın olmalı.",
  "Yolunu belirle ve ona sadık kal.",
  "Kazanmak için önce kaybetmeyi göze al.",
  "Gecikmiş başarı, hiçbir şeydir.",
  "Hayat sana ikinci bir şans vermez, değerlendir.",
  "Hedefin netse, yolun da net olur.",
  "Günlük disiplin büyük değişimler doğurur.",
  "İlerlemek için değişmekten korkma.",
  "Bugün ne kadar uğraşırsan, yarın o kadar özgür olursun.",
  "Kendi senfonini sen yaz.",
  "Her zorluk daha iyi bir sen yaratır.",
  "Başarı, hayal gücünü eylemle birleştirmektir.",
  "Kendi potansiyelinin farkına var.",
  "Düşlerini küçültme, büyüt.",
  "Kararlı ol, tutkulu ol, hiçbir şey seni durduramaz.",
  "Her zorluk bir fırsattır.",
  "Gülümse ve devam et, yol uzun ama sen güçlüsün.",
  "Kendi limitlerini aşmak senin elinde.",
  "Azimle bir tohum dik, başarıyı hasat et.",
  "İnandığın şey uğruna ömür vermeye değer.",
  "Bugün verilen çaba, yarına atılan adımdır.",
  "Her büyük başarı bir adımla başlar.",
  "Hayallerin seni sabah uyandırsın.",
  "Kendine meydan oku, büyüme orada başlar.",
  "Yılma, denemeye devam et.",
  "Başarı asla tesadüf değildir.",
  "İleriye bak, geçmişin seni sınırlamasın.",
  "Çalışmak yorucu olabilir, ama vazgeçmek daha da yorucudur.",
  "Her gün biraz daha iyi ol.",
  "Tutkun senin itici gücündür.",
  "Sonsuz potansiyelin var, kullan.",
  "Düşlerin için savaş, korkuların için değil.",
  "Başarı senin seçimindir.",
  "Hayatını tutku ve azimle şekillendir.",
  "Her yeni hedef sana yeni bir sen kazandırır.",
  "İstediğin hayat için harekete geç.",
  "Kendi başarı hikayeni yaz.",
  "Gücün sınırını sen belirlersin.",
  "Hayatını bir başyapıt haline getir.",
  "Başarı cesur adımların eseridir.",
  "Yapabileceğine dair inancın seni motive eder.",
  "Zaman akıyor, sen de harekete geç.",
  "Kendi sınırlarının ötesine bak.",
  "Her zorluğun sonunda bir ders vardır.",
  "Hayatta büyük düşün, büyük hareket et.",
  "Kendi hayallerinin mimarı ol.",
  "İlerlemenin anahtarı kararlılıktır.",
  "Sabır ve azim ile her şeyi başarabilirsin.",
  "Hayat, hedefe koşanlara kapılarını açar.",
  "Vazgeçmeyi düşünme, denemeye devam et.",
  "Kendi hikayeni yazarak fark yarat.",
  "Gününü planla, başarını inşa et.",
  "Her zorluk seni daha güçlü kılar.",
  "İnan, çalış, başarmak senin elinde.",
  "Hayallerinin peşinden gitmek cesaret ister.",
  "Büyük işler, küçük adımlarla başlar.",
  "Her gün kendini yeniden keşfet.",
  "Kararlılık, başarıya giden en güvenli yoldur.",
  "Hedeflerine olan yolculuğun kendisi büyük bir ödül.",
  "Kendine inandığında sınırlar kaybolur.",
  "Başarı için sınır yok, sadece imkan var.",
  "Bugün senin için bir dönüm noktası olabilir.",
  "Her sabah yeni bir şans demektir.",
  "Geleceğini hayal et ve onu inşa et.",
  "Yapabileceğinin en iyisini yap.",
  "Her an bir adım daha yaklaşmış olabilirsin.",
  "Çalışmak bir seçim, vazgeçmek bir zarar.",
  "Hayat senin elinde, şekillendir.",
  "Gücünü azminden al.",
  "İstikrarlı ol, sonuçlar seni şaşırtacak.",
  "Başarı, sabrın ve emeklerin eseridir.",
  "Hayallerinden korkma, onlara sarıl.",
  "Kendi potansiyelini keşfetmenin tam zamanı.",
  "Zorluklarla dans et, onlara yenilme.",
  "İmkansızı başarabilirsin, yeter ki dene.",
  "Kendi yolunu çiz ve ona sadık kal.",
  "Her düşüş seni yeniden yükseltir.",
  "Hayat seni denemek için zorluklar çıkarır; sen kazanmak için karşılık ver.",
  "Azim, kararlılık ve sabır birleştiğinde her şey mümkündür.",
  "Gelecek senin hayallerin kadar parlak olur.",
  "Kendine verdiğin değer, başarı oranını artırır.",
  "Bugün attığın adım, yarının hikayesini yazacak.",
  "Karşına çıkan engeller seni değil, seni inşa eder.",
  "Başarı, cesaretin eyleme dönüştüğü an başlar.",
  "Hedeflerin yüksek olsun, arzuların güçlü.",
  "Kendi sınırlarını aşmak senin en büyük maceran.",
  "Hayallerini gerçeğe dönüştürmek senin elinde.",
  "Her gün bir adım daha ileri gitmeye karar ver.",
  "İnandığın yolda yürümek seni ölümsüzleştirir.",
  "Belirsizlikten korkma, belki de orada fırsat var.",
  "Her hedef senin vizyonunun bir parçasıdır.",
  "Kendi içindeki gücü keşfet.",
  "Gücünü sen belirlersin, sınırlarını sen çizersin.",
  "Korkularının seni durdurmasına izin verme.",
  "Azimli yürek, her dağı aşar.",
  "Yıldızlara dokunmak istiyorsan önce yükseğe tırman.",
  "Hayat, hayal kuranlara ve çalışkanlara güler.",
  "Kendi efsaneni yaratmak için çalış.",
  "Her gün, kendine bir iyilik yap; geliş.",
  "Başarı, vazgeçmeyen ruhların armağanıdır.",
  "İleriye baktığında geriye değil, ileriye odaklan.",
  "Hayallerin sana rehberlik etsin.",
  "Disiplin, özgürlüğün anahtarıdır.",
  "Gücün senin azminde saklı.",
  "Kendi potansiyelini küçümseme.",
  "Hayat, mücadele edenlerin yanındadır.",
  "Sen büyük bir şey olmaya layıksın.",
  "Korkularını cesaretinle fethet.",
  "Her gün bir önceki günden daha güçlü ol.",
  "Vazgeçmek en büyük hata.",
  "Hedefine giden yolda her adım önemlidir.",
  "Zafer, kararlılıkla gelir."
];


// =====================================================================
// FONKSİYONLAR (Yardımcı Formatlar)
// =====================================================================
const formatSure = (sn) => {
  const dk = Math.floor(sn / 60);
  const s = sn % 60;
  return `${dk < 10 ? '0' + dk : dk}:${s < 10 ? '0' + s : s}`;
};

const formatSaatDakika = (sn) => {
  if (!sn || sn === 0) return "0sa 00dk";
  const sa = Math.floor(sn / 3600);
  const dk = Math.floor((sn % 3600) / 60);
  const dkStr = dk < 10 ? '0' + dk : dk;
  return `${sa}sa ${dkStr}dk`;
};

// ZİNCİR İÇİN GEREKLİ HEDEF BULMA FONKSİYONU
const oGununHedefiniGetir = (tarihStr, gecmisTablosu, sonHedef) => {
  if (gecmisTablosu[tarihStr]) return gecmisTablosu[tarihStr];
  const tarihler = Object.keys(gecmisTablosu).sort(); 
  const oncekiTarihler = tarihler.filter(t => t < tarihStr);
  
  if (oncekiTarihler.length > 0) {
    const enYakinTarih = oncekiTarihler[oncekiTarihler.length - 1]; 
    return gecmisTablosu[enYakinTarih];
  }
  return sonHedef || 1;
};

// =====================================================================
// Custom Alert Modalı
// =====================================================================
function CustomAlert({ visible, title, message, type, onClose }) {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
    
    if (visible) {
      const timer = setTimeout(() => {
        kapat();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const getStyle = () => {
    switch (type) {
      case 'success': return { color: '#34d399', icon: 'checkmark-circle' }; // Canlı Yeşil
      case 'error': return { color: '#ef4444', icon: 'alert-circle' };
      case 'warning': return { color: '#fbbf24', icon: 'warning' };
      case 'info':
      default: return { color: '#2563eb', icon: 'information-circle' }; // Canlı Mavi
    }
  };
  const style = getStyle();

  const kapat = () => {
    setModalVisible(false);
    onClose && onClose();
  };

  if (!modalVisible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={kapat}
    >
      <View style={styles.alertOverlay}>
        <View style={[styles.alertKutusu, { borderColor: style.color }]}>
          
          <Ionicons name={style.icon} size={30} color={style.color} style={{marginBottom: 10}} />

          <Text style={styles.alertBaslik}>{title}</Text>
          <Text style={styles.alertMesaj}>{message}</Text>
          
          <TouchableOpacity style={[styles.alertButon, { backgroundColor: style.color }]} onPress={kapat}>
            <Text style={styles.alertButonYazi}>Tamam</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// =====================================================================
// GLOBAL ALERT YÖNETİMİ
// =====================================================================
let setGlobalAlert = () => {};

export const ShowAlert = (title, message, type = 'info') => {
  setGlobalAlert({ title, message, type, visible: true });
};


// =====================================================================
// 1. EKRAN: SAYAÇ
// =====================================================================
function SayacEkrani() {
  const [kalanZaman, setKalanZaman] = useState({ gun: 0, saat: 0, dakika: 0, saniye: 0 });
  const [aktifMod, setAktifMod] = useState('bosta'); 
  const [gecenSaniye, setGecenSaniye] = useState(0); 
  const [oturumBirikmisSure, setOturumBirikmisSure] = useState(0);
  const [toplamDers, setToplamDers] = useState(0);
  const [toplamMola, setToplamMola] = useState(0);
  const [gecmisListesi, setGecmisListesi] = useState({});
  const [gecmisAcik, setGecmisAcik] = useState(false);
  const [gununSozu, setGununSozu] = useState("");

  const hedefTarih = new Date("2026-06-20T10:15:00").getTime();

  useEffect(() => { verileriYukle(); secGununSozu(); }, []);

  const secGununSozu = () => {
    const randomIndeks = Math.floor(Math.random() * MOTIVASYON_SOZLERI.length);
    setGununSozu(MOTIVASYON_SOZLERI[randomIndeks]);
  };

  const verileriYukle = async () => {
    try {
      const tDers = await AsyncStorage.getItem('toplamDers');
      const tMola = await AsyncStorage.getItem('toplamMola');
      const tOturum = await AsyncStorage.getItem('oturumBirikmisSure');
      const kayitliMod = await AsyncStorage.getItem('aktifMod');
      const kayitliGecmis = await AsyncStorage.getItem('gecmisListesi');
      
      if (tDers) setToplamDers(parseInt(tDers) || 0);
      if (tMola) setToplamMola(parseInt(tMola) || 0);
      if (tOturum) setOturumBirikmisSure(parseInt(tOturum) || 0);
      if (kayitliGecmis) setGecmisListesi(JSON.parse(kayitliGecmis));
      if (kayitliMod && kayitliMod !== 'bosta') setAktifMod(kayitliMod);
    } catch (e) { console.log(e); }
  };

  useEffect(() => {
    let interval = null;
    if (aktifMod !== 'bosta') {
      interval = setInterval(async () => {
        const baslangic = await AsyncStorage.getItem('baslangicZamani');
        if (baslangic) {
          const fark = Math.floor((Date.now() - parseInt(baslangic)) / 1000);
          setGecenSaniye(fark);
        }
      }, 1000);
    } else {
      setGecenSaniye(0);
    }
    return () => clearInterval(interval);
  }, [aktifMod]);

  useEffect(() => {
    const timer = setInterval(() => {
      const simdi = new Date().getTime();
      const diff = hedefTarih - simdi;
      if (diff < 0) { setKalanZaman({ gun: 0, saat: 0, dakika: 0, saniye: 0 }); return; }
      setKalanZaman({
        gun: Math.floor(diff / (1000 * 60 * 60 * 24)),
        saat: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        dakika: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        saniye: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bugununTarihi = () => {
    const d = new Date();
    const offset = d.getTimezoneOffset() * 60000; 
    return (new Date(d - offset)).toISOString().slice(0, 10);
  };

  const modDegistir = async (hedefMod) => {
    const baslangic = await AsyncStorage.getItem('baslangicZamani');
    let anlikSure = 0;
    if (baslangic) anlikSure = Math.floor((Date.now() - parseInt(baslangic)) / 1000);

    if (aktifMod === 'ders') {
      const yeniKasa = oturumBirikmisSure + anlikSure;
      setOturumBirikmisSure(yeniKasa);
      await AsyncStorage.setItem('oturumBirikmisSure', yeniKasa.toString());
      const yeniToplam = toplamDers + anlikSure;
      setToplamDers(yeniToplam);
      await AsyncStorage.setItem('toplamDers', yeniToplam.toString());
      await gunlukKayitGuncelle(anlikSure, 0);
    } else if (aktifMod === 'mola') {
      const yeniToplam = toplamMola + anlikSure;
      setToplamMola(yeniToplam);
      await AsyncStorage.setItem('toplamMola', yeniToplam.toString());
      await gunlukKayitGuncelle(0, anlikSure);
    }

    const simdi = Date.now().toString();
    await AsyncStorage.setItem('baslangicZamani', simdi);
    await AsyncStorage.setItem('aktifMod', hedefMod);
    setAktifMod(hedefMod);
    setGecenSaniye(0); 
  };

  const gunlukKayitGuncelle = async (ekDers, ekMola) => {
    const tarih = bugununTarihi();
    const eskiListe = {...gecmisListesi};
    if (!eskiListe[tarih]) eskiListe[tarih] = { ders: 0, mola: 0 };
    eskiListe[tarih].ders = (eskiListe[tarih].ders || 0) + ekDers;
    eskiListe[tarih].mola = (eskiListe[tarih].mola || 0) + ekMola;
    setGecmisListesi(eskiListe);
    await AsyncStorage.setItem('gecmisListesi', JSON.stringify(eskiListe));
  };

  const bitir = async () => {
    const baslangic = await AsyncStorage.getItem('baslangicZamani');
    let anlikSure = 0;
    if (baslangic) anlikSure = Math.floor((Date.now() - parseInt(baslangic)) / 1000);

    if (aktifMod === 'ders') {
      const yeniToplam = toplamDers + anlikSure;
      setToplamDers(yeniToplam);
      await AsyncStorage.setItem('toplamDers', yeniToplam.toString());
      await gunlukKayitGuncelle(anlikSure, 0);
    } else if (aktifMod === 'mola') {
      const yeniToplam = toplamMola + anlikSure;
      setToplamMola(yeniToplam);
      await AsyncStorage.setItem('toplamMola', yeniToplam.toString());
      await gunlukKayitGuncelle(0, anlikSure);
    }

    await AsyncStorage.multiRemove(['baslangicZamani', 'aktifMod', 'oturumBirikmisSure']);
    setAktifMod('bosta');
    setOturumBirikmisSure(0);
    setGecenSaniye(0);
    ShowAlert("Günün Özeti", "Veriler günlüğe işlendi.", 'success');
  };

  const tumVerileriSifirla = () => {
    Alert.alert("FABRİKA AYARLARI", "Tüm veriler silinecek. Emin misin?", [
      { text: "Vazgeç", style: "cancel" },
      { text: "EVET, SİL", style: "destructive", onPress: async () => {
          await AsyncStorage.clear();
          setToplamDers(0); setToplamMola(0); setOturumBirikmisSure(0); setGecenSaniye(0);
          setAktifMod('bosta'); setGecmisListesi({}); setGecmisAcik(false);
          ShowAlert("Sıfırlandı", "Bütün veriler temizlendi.", 'warning');
      }}
    ]);
  };

  return (
    // TEMA: DENİZ VE GÖKYÜZÜ MAVİSİ GEÇİŞİ
    <LinearGradient colors={['#0f172a', '#075985', '#0e7490']} style={styles.container}> 
      <TouchableOpacity style={styles.istatistikButon} onPress={() => setGecmisAcik(true)}>
        <Text style={{fontSize: 24}}>📊</Text>
      </TouchableOpacity>

      <Text style={styles.baslik}>SINAVMATİK</Text>
      
      <View style={[styles.sozKutusu, {backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(251, 191, 36, 0.5)'}]}>
        <Text style={{color:'#fbbf24', fontStyle:'italic', textAlign:'center'}}>"{gununSozu}"</Text>
      </View>

      <View style={styles.istatistikSatiri}>
        <View style={[styles.kucukKutu, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
            <Text style={styles.kucukBaslik}>TOPLAM ÇALIŞMA</Text>
            <Text style={[styles.kucukSayi, {color: '#34d399'}]}>{formatSaatDakika(toplamDers)}</Text>
        </View>
        <View style={[styles.kucukKutu, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
            <Text style={styles.kucukBaslik}>TOPLAM MOLA</Text>
            <Text style={[styles.kucukSayi, {color: '#fbbf24'}]}>{formatSaatDakika(toplamMola)}</Text>
        </View>
      </View>

      <View style={[styles.sayacKutusu, {backgroundColor: '#020617', borderColor: 'rgba(255,255,255,0.15)', borderWidth: 1}, aktifMod === 'ders' ? {borderColor: '#34d399', borderWidth: 2} : aktifMod === 'mola' ? {borderColor: '#fbbf24', borderWidth: 2} : {}]}>
        {aktifMod === 'bosta' && (
            <View style={{alignItems:'center'}}>
                <Text style={styles.kalanZamanBaslik}>YKS 2026</Text>
                <Text style={styles.kalanZaman}>{kalanZaman.gun} Gün</Text>
                <Text style={styles.kalanSaat}>{kalanZaman.saat}:{kalanZaman.dakika}:{kalanZaman.saniye}</Text>
            </View>
        )}
        {aktifMod === 'ders' && (
            <View style={{alignItems:'center'}}>
                <Text style={styles.kalanZamanBaslik}>ODAKLANMA SÜRESİ</Text>
                <Text style={[styles.kronometre, {color: '#34d399'}]}>{formatSure(oturumBirikmisSure + gecenSaniye)}</Text>
                <Text style={{color:'#94a3b8'}}>Ders Çalışılıyor...</Text>
            </View>
        )}
        {aktifMod === 'mola' && (
            <View style={{alignItems:'center'}}>
                <Text style={styles.kalanZamanBaslik}>MOLA SÜRESİ</Text>
                <Text style={[styles.kronometre, {color: '#fbbf24'}]}>{formatSure(gecenSaniye)}</Text>
                <Text style={{color:'#94a3b8'}}>Dinlenme Zamanı</Text>
            </View>
        )}
      </View>

      <View style={styles.butonSatiri}>
        {aktifMod === 'bosta' && (
            <TouchableOpacity style={[styles.buyukButon, {backgroundColor: '#2563eb'}]} onPress={() => modDegistir('ders')}>
                <Text style={styles.butonYazi}>Dersi Başlat</Text>
            </TouchableOpacity>
        )}
        {aktifMod === 'ders' && (
            <>
            <TouchableOpacity style={[styles.yarimButon, {backgroundColor: '#fbbf24'}]} onPress={() => modDegistir('mola')}>
                <Text style={styles.butonYazi}>Mola Ver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.yarimButon, {backgroundColor: '#ef4444'}]} onPress={bitir}>
                <Text style={styles.butonYazi}>Günü Bitir</Text>
            </TouchableOpacity>
            </>
        )}
        {aktifMod === 'mola' && (
            <>
            <TouchableOpacity style={[styles.yarimButon, {backgroundColor: '#34d399'}]} onPress={() => modDegistir('ders')}>
                <Text style={styles.butonYazi}>Derse Dön</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.yarimButon, {backgroundColor: '#ef4444'}]} onPress={bitir}>
                <Text style={styles.butonYazi}>Bitir</Text>
            </TouchableOpacity>
            </>
        )}
      </View>

      <Modal visible={gecmisAcik} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <Text style={styles.modalBaslik}>ÇALIŞMA GÜNLÜĞÜ</Text>
          <ScrollView style={{width:'100%'}}>
            {Object.keys(gecmisListesi).reverse().map((tarih) => (
              <View key={tarih} style={styles.listeElemani}>
                <Text style={styles.tarihYazi}>{tarih}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <View style={{flexDirection:'row', alignItems:'center', marginRight:15}}>
                    <Text style={{fontSize:16}}>📚 </Text>
                    <Text style={{color:'#34d399', fontWeight:'bold', fontSize:14}}>
                       {formatSaatDakika(gecmisListesi[tarih].ders)}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontSize:16}}>☕ </Text>
                    <Text style={{color:'#fbbf24', fontWeight:'bold', fontSize:14}}>
                      {formatSaatDakika(gecmisListesi[tarih].mola)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            <View style={{height:50}}></View>
          </ScrollView>
          <TouchableOpacity style={[styles.kapatButon, {backgroundColor: '#b91c1c', marginBottom: 10}]} onPress={tumVerileriSifirla}>
            <Text style={styles.butonYazi}>⚠️ TÜM VERİLERİ SIFIRLA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kapatButon} onPress={() => setGecmisAcik(false)}>
            <Text style={styles.butonYazi}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
}

// =====================================================================
// 2. EKRAN: AJANDA
// =====================================================================
function AjandaEkrani() {
  const [planlar, setPlanlar] = useState({});
  const [seciliGun, setSeciliGun] = useState(null);
  const [planMetni, setPlanMetni] = useState("");
  const [modalAcik, setModalAcik] = useState(false);

  const [gecmis, setGecmis] = useState({});
  const [gunlukHedef, setGunlukHedef] = useState('1'); 
  const [hedefGecmisi, setHedefGecmisi] = useState({});

  const gunler = [...Array(14)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      tarih: d.toISOString().split('T')[0],
      gunAdi: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
      gunNo: d.getDate()
    };
  });

  useEffect(() => { yukleVerileri(); }, []);

  const yukleVerileri = async () => {
    const kayitliPlanlar = await AsyncStorage.getItem('ajandaPlanlari');
    if (kayitliPlanlar) setPlanlar(JSON.parse(kayitliPlanlar));
    
    const kayitliGecmis = await AsyncStorage.getItem('gecmisListesi');
    const kayitliHedef = await AsyncStorage.getItem('gunlukHedef');
    const kayitliHedefGecmisi = await AsyncStorage.getItem('hedefGecmisi');

    let hGecmisi = {};
    if (kayitliHedefGecmisi) hGecmisi = JSON.parse(kayitliHedefGecmisi);
    setHedefGecmisi(hGecmisi);

    if (kayitliHedef) setGunlukHedef(kayitliHedef);
    if (kayitliGecmis) setGecmis(JSON.parse(kayitliGecmis));
  };

  const gunSec = (tarih) => {
    setSeciliGun(tarih);
    setPlanMetni(planlar[tarih] || ""); 
    setModalAcik(true);
  };

  const planiKaydet = async () => {
    const yeniPlanlar = { ...planlar };
    
    if (planMetni.trim() === '') {
        delete yeniPlanlar[seciliGun];
        ShowAlert("Plan Silindi", "Günlük not başarıyla kaldırıldı.", 'warning');
    } else {
        yeniPlanlar[seciliGun] = planMetni.trim();
        ShowAlert("Planlandı", "Hedef not alındı.", 'success');
    }

    setPlanlar(yeniPlanlar);
    await AsyncStorage.setItem('ajandaPlanlari', JSON.stringify(yeniPlanlar));
    setModalAcik(false);
  };

  const performansDurumu = (tarih) => {
    const calismaSuresi = gecmis[tarih] ? gecmis[tarih].ders : 0;
    const hedef = oGununHedefiniGetir(tarih, hedefGecmisi, parseInt(gunlukHedef));
    const calismaDakika = Math.floor(calismaSuresi / 60);

    const bugunTarih = new Date().toISOString().split('T')[0];
    const bugun = (tarih === bugunTarih);
    const gecmisGun = (tarih < bugunTarih);

    if (gecmisGun && calismaDakika >= hedef) {
      return { ikon: 'checkmark-circle', renk: '#34d399', yazi: 'Hedef Tutmuş' };
    }
    if (gecmisGun && calismaDakika < hedef) {
      return { ikon: 'close-circle', renk: '#ef4444', yazi: `Tutmadı (${calismaDakika}/${hedef} dk)` };
    }
    if (bugun) {
      return { ikon: 'time', renk: '#fbbf24', yazi: `Bugün: ${calismaDakika} / ${hedef} dk` };
    }
    return { ikon: 'calendar', renk: '#94a3b8', yazi: '' };
  };

  return (
    <LinearGradient colors={['#0f172a', '#075985', '#0e7490']} style={styles.container}>
      <Text style={styles.baslik}>AJANDA 📅</Text>
      <Text style={{color:'#94a3b8', marginBottom:20}}>Gelecek 2 haftanı planla, sürpriz yaşama.</Text>

      <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
        {gunler.map((gun) => {
          const durum = performansDurumu(gun.tarih);
          const planVar = planlar[gun.tarih] && planlar[gun.tarih].trim() !== '';
          const gosterPerformance = (gun.tarih <= new Date().toISOString().split('T')[0]); 

          return (
            <TouchableOpacity key={gun.tarih} style={[styles.ajandaSatiri, {backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: durum.renk, borderWidth: (durum.ikon === 'close-circle' || durum.ikon === 'checkmark-circle') ? 2 : 0}]} onPress={() => gunSec(gun.tarih)}>
              <View style={[styles.tarihKutusu, {backgroundColor: 'rgba(255, 255, 255, 0.05)'}]}>
                <Text style={{color:'#fbbf24', fontWeight:'bold'}}>{gun.gunAdi}</Text>
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>{gun.gunNo}</Text>
              </View>
              
              <View style={styles.planIcerik}>
                {planVar ? (
                  <Text style={{color:'white', fontSize:14, marginBottom: 5}}>{planlar[gun.tarih]}</Text>
                ) : (
                  <Text style={{color:'#64748b', fontStyle:'italic', marginBottom: 5}}>Plan eklemek için dokun...</Text>
                )}
                
                {gosterPerformance && (
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name={durum.ikon} size={14} color={durum.renk} style={{marginRight: 5}} />
                    <Text style={{color: durum.renk, fontSize: 12, fontWeight:'bold'}}>{durum.yazi}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height:50}}></View>
      </ScrollView>

      <Modal visible={modalAcik} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.hedefModal}>
            <Text style={{color:'#fbbf24', fontSize:18, fontWeight:'bold', marginBottom:10}}>Planını Yaz</Text>
            <Text style={{color:'white', marginBottom:10}}>{seciliGun}</Text>
            
            <TextInput 
              style={styles.planInput} 
              multiline
              placeholder="Örn: 50 Paragraf + Türev Fasikülü" 
              placeholderTextColor="#64748b"
              value={planMetni}
              onChangeText={setPlanMetni}
            />

            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
              <TouchableOpacity style={[styles.kaydetButon, {backgroundColor:'#334155', width:'48%'}]} onPress={() => setModalAcik(false)}>
                <Text style={{color:'white'}}>Vazgeç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.kaydetButon, {width:'48%'}]} onPress={planiKaydet}>
                <Text style={{color:'white', fontWeight:'bold'}}>KAYDET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

// =====================================================================
// 3. EKRAN: DERS TAKİP
// =====================================================================
function KonularEkrani() {
  const [aktifSekme, setAktifSekme] = useState('TYT'); 
  const varsayilanDersler = [{id: 'tyt_mat', tur: 'TYT', ad: 'Matematik', konular: [{ id: 1, ad: 'Temel Kavramlar', bitti: false },{ id: 2, ad: 'Sayı Basamakları', bitti: false },{ id: 3, ad: 'Mutlak Değer', bitti: false },{ id: 4, ad: 'Üslü - Köklü', bitti: false },{ id: 5, ad: 'Problemler', bitti: false },]},{id: 'tyt_turk', tur: 'TYT', ad: 'Türkçe', konular: [{ id: 11, ad: 'Sözcükte Anlam', bitti: false },{ id: 12, ad: 'Paragraf', bitti: false },{ id: 13, ad: 'Dil Bilgisi', bitti: false },{ id: 14, ad: 'Yazım - Noktalama', bitti: false },]},{id: 'tyt_fen', tur: 'TYT', ad: 'Fen Bilimleri', konular: [{ id: 21, ad: 'Fizik: Madde ve Özellikleri', bitti: false },{ id: 22, ad: 'Kimya: Atom ve Yapısı', bitti: false },{ id: 23, ad: 'Biyoloji: Hücre', bitti: false },]},{id: 'ayt_mat', tur: 'AYT', ad: 'Matematik', konular: [{ id: 101, ad: 'Polinomlar', bitti: false },{ id: 102, ad: 'Trigonometri', bitti: false },{ id: 103, ad: 'Logaritma', bitti: false },{ id: 104, ad: 'Limit - Türev - İntegral', bitti: false },]},{id: 'ayt_fiz', tur: 'AYT', ad: 'Fizik', konular: [{ id: 201, ad: 'Vektörler', bitti: false },{ id: 202, ad: 'Elektrik ve Manyetizma', bitti: false },{ id: 203, ad: 'Modern Fizik', bitti: false },]},{id: 'ayt_kim', tur: 'AYT', ad: 'Kimya', konular: [{ id: 301, ad: 'Modern Atom Teorisi', bitti: false },{ id: 302, ad: 'Gazlar', bitti: false },{ id: 303, ad: 'Organik Kimya', bitti: false },]},{id: 'ayt_edb', tur: 'AYT', ad: 'Edebiyat', konular: [{ id: 401, ad: 'Şiir Bilgisi', bitti: false },{ id: 402, ad: 'Divan Edebiyatı', bitti: false },{ id: 403, ad: 'Cumhuriyet Dönemi', bitti: false },]},{id: 'ydt_grammar', tur: 'YDT', ad: 'Grammar (Dilbilgisi)', konular: [{ id: 501, ad: 'Tenses (Zamanlar)', bitti: false },{ id: 502, ad: 'Modals', bitti: false },{ id: 503, ad: 'Passive Voice', bitti: false },{ id: 504, ad: 'If Clauses / Conditionals', bitti: false },{ id: 505, ad: 'Relative Clauses', bitti: false },{ id: 506, ad: 'Conjunctions (Bağlaçlar)', bitti: false },]},{id: 'ydt_skills', tur: 'YDT', ad: 'Soru Tipleri (Skills)', konular: [{ id: 601, ad: 'Cloze Test', bitti: false },{ id: 602, ad: 'Cümle Tamamlama', bitti: false },{ id: 603, ad: 'Çeviri (Eng-Tr / Tr-Eng)', bitti: false },{ id: 604, ad: 'Paragraf (Reading)', bitti: false },{ id: 605, ad: 'Diyalog Tamamlama', bitti: false },{ id: 606, ad: 'Anlamca En Yakın Cümle', bitti: false },]},{id: 'ydt_vocab', tur: 'YDT', ad: 'Vocabulary (Kelime)', konular: [{ id: 701, ad: 'Phrasal Verbs', bitti: false },{ id: 702, ad: 'Prepositions', bitti: false },{ id: 703, ad: 'Sık Çıkan Sıfatlar', bitti: false },{ id: 704, ad: 'Sık Çıkan Fiiller', bitti: false },]}];
  const [dersler, setDersler] = useState(varsayilanDersler);
  const [seciliDers, setSeciliDers] = useState(null);
  useEffect(() => { yukle(); }, []);
  const yukle = async () => { try { const kayitli = await AsyncStorage.getItem('dersTakipVerisi_v3'); if (kayitli) setDersler(JSON.parse(kayitli)); } catch (e) { console.log(e); } };
  const tikla = async (konuId) => { if (!seciliDers) return; const yeniDersler = dersler.map(ders => { if (ders.id === seciliDers.id) { const yeniKonular = ders.konular.map(k => { if (k.id === konuId) return { ...k, bitti: !k.bitti }; return k; }); return { ...ders, konular: yeniKonular }; } return ders; }); setDersler(yeniDersler); const guncelSecili = yeniDersler.find(d => d.id === seciliDers.id); setSeciliDers(guncelSecili); await AsyncStorage.setItem('dersTakipVerisi_v3', JSON.stringify(yeniDersler)); };
  const yuzdeHesapla = (konular) => { if (konular.length === 0) return 0; const biten = konular.filter(k => k.bitti).length; return Math.round((biten / konular.length) * 100); };
  const gosterilecekDersler = dersler.filter(d => d.tur === aktifSekme);
  return ( 
    <LinearGradient colors={['#0f172a', '#075985', '#0e7490']} style={styles.container}> 
      <View style={{marginTop: 40, marginBottom: 15, width: '90%', flexDirection: 'row', alignItems: 'center'}}> 
        {seciliDers ? ( 
          <TouchableOpacity onPress={() => setSeciliDers(null)} style={{marginRight: 15}}> 
            <Ionicons name="arrow-back-circle" size={40} color="#fbbf24" /> 
          </TouchableOpacity> 
        ) : null} 
        <View> 
          <Text style={{fontSize: 28, fontWeight: 'bold', color: '#fbbf24'}}> 
            {seciliDers ? seciliDers.ad : 'DERS TAKİP 📚'} 
          </Text> 
          {seciliDers ? ( 
            <Text style={{color:'#cbd5e1', fontSize: 12}}>{seciliDers.tur} Konuları</Text> 
          ) : ( 
            <Text style={{color:'#cbd5e1', fontSize: 12}}>Eksiklerini tamamla şampiyon.</Text> 
          )} 
        </View> 
      </View> 
      
      {!seciliDers && ( 
        <View style={[styles.sinavSecimSatiri, {backgroundColor: 'rgba(255,255,255,0.1)'}]}> 
          {['TYT', 'AYT', 'YDT'].map((tur) => ( 
            <TouchableOpacity key={tur} style={[styles.sinavTab, aktifSekme === tur ? {backgroundColor:'#fbbf24'} : {}]} onPress={() => setAktifSekme(tur)}> 
              <Text style={[styles.sinavTabYazi, aktifSekme === tur ? {color:'#1e293b'} : {color:'#94a3b8'}]}>{tur}</Text> 
            </TouchableOpacity> 
          ))} 
        </View> 
      )} 
      
      <ScrollView style={{width: '90%'}}> 
        {!seciliDers ? ( 
            <View style={{width:'100%'}}>
            {gosterilecekDersler.map((ders) => { const yuzde = yuzdeHesapla(ders.konular); return ( 
              <TouchableOpacity key={ders.id} style={[styles.dersKarti, {backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1}]} onPress={() => setSeciliDers(ders)}> 
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 10}}> 
                  <Text style={styles.dersBaslik}>{ders.ad}</Text> 
                  <View style={{flexDirection:'row', alignItems:'center'}}> 
                    <View style={{backgroundColor:'rgba(251, 191, 36, 0.2)', paddingHorizontal:6, paddingVertical:2, borderRadius:4, marginRight:10, borderWidth:1, borderColor:'#fbbf24'}}> 
                      <Text style={{color:'#fbbf24', fontSize:10, fontWeight:'bold'}}>{ders.tur}</Text> 
                    </View> 
                    <Text style={{color: yuzde===100 ? '#34d399':'#fbbf24', fontWeight:'bold'}}>%{yuzde}</Text> 
                  </View> 
                </View> 
                <View style={{height: 6, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 3}}> 
                  <View style={{ height: 6, backgroundColor: yuzde === 100 ? '#34d399' : '#fbbf24', width: `${yuzde}%`, borderRadius: 3 }} /> 
                </View> 
              </TouchableOpacity> 
            ); })} 
            <View style={{height: 50}} />
            </View>
        ) : ( 
          <View style={{width:'100%'}}>
          <View style={[styles.ilerlemeKutusu, {backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(251, 191, 36, 0.3)'}]}> 
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}> 
              <Text style={{color:'white'}}>Genel İlerleme</Text> 
              <Text style={{color:'#fbbf24', fontWeight:'bold'}}>%{yuzdeHesapla(seciliDers.konular)}</Text> 
            </View> 
            <View style={{height: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 5}}> 
              <View style={{ height: 10, backgroundColor: '#10b981', width: `${yuzdeHesapla(seciliDers.konular)}%`, borderRadius: 5 }} /> 
            </View> 
          </View> 
          
          {seciliDers.konular.map((konu) => ( 
            <TouchableOpacity key={konu.id} style={[styles.konuSatiri, {
                backgroundColor: konu.bitti ? 'rgba(52, 211, 153, 0.3)' : '#0f172a', // Daha açık yeşil/siyah
                borderColor: konu.bitti ? '#34d399' : 'rgba(255,255,255,0.1)', // Canlı yeşil çerçeve
                borderWidth: 1,
            }]} onPress={() => tikla(konu.id)}> 
              <Text style={[styles.konuYazi, konu.bitti ? {color: '#a7f3d0', textDecorationLine: 'line-through'} : {color: '#e2e8f0'}]}> {konu.ad} </Text> 
              <View style={[styles.tikKutusu, konu.bitti ? {backgroundColor: '#34d399', borderColor:'#34d399'} : {borderColor: 'rgba(255,255,255,0.3)'}]}> 
                {konu.bitti && <Ionicons name="checkmark" size={16} color="white" />} 
              </View> 
            </TouchableOpacity> 
          ))} 
          <View style={{height: 50}} /> 
          </View>
        )}
      </ScrollView> 
    </LinearGradient> 
  );
}

// =====================================================================
// 4. EKRAN: ANALİZ (Gökyüzü Mavi Teması)
// =====================================================================
function AnalizEkrani() {
  const [seciliSinav, setSeciliSinav] = useState('TYT'); 
  const [sonuclar, setSonuclar] = useState([]); 
  const [girisler, setGirisler] = useState({});
  
  // SINAV SORU SAYISI KURALLARI (Limit Kontrolü için)
  const SINAV_KURALLARI = { 
    TYT: [
      { id: 'turkce', ad: 'Türkçe', soru: 40 }, 
      { id: 'sosyal', ad: 'Sosyal Bil.', soru: 20 }, 
      { id: 'mat', ad: 'Matematik', soru: 40 }, 
      { id: 'fen', ad: 'Fen Bil.', soru: 20 }
    ], 
    AYT: [
      { id: 'mat', ad: 'Matematik', soru: 40 }, 
      { id: 'fen', ad: 'Fen Bil.', soru: 40 }, 
      { id: 'edb', ad: 'Edebiyat-Sos1', soru: 40 }, 
      { id: 'sos2', ad: 'Sosyal-2', soru: 40 }
    ], 
    YDT: [
      { id: 'dil', ad: 'Yabancı Dil', soru: 80 }
    ] 
  };
  
  useEffect(() => { verileriYukle(); }, []);
  
  const verileriYukle = async () => { 
    const kayitli = await AsyncStorage.getItem('denemeSonuclari_v2'); 
    if (kayitli) setSonuclar(JSON.parse(kayitli)); 
  };
  
  const veriGirisiYap = (dersId, tur, deger) => { 
  if (deger !== '' && isNaN(Number(deger))) return; 
  setGirisler(prev => ({ 
    ...prev, 
    [`${seciliSinav}_${dersId}_${tur}`]: deger 
  })); 
};

  
  const hesaplaVeKaydet = async () => { 
    let toplamNet = 0; 
    let hataVar = false; 
    let hataMesaji = ""; 
    const dersler = SINAV_KURALLARI[seciliSinav]; 
    
    // Limit Kontrolü ve Net Hesaplama
    for (let ders of dersler) { 
      const dStr = girisler[`${seciliSinav}_${ders.id}_d`] || '0'; 
      const yStr = girisler[`${seciliSinav}_${ders.id}_y`] || '0'; 
      const d = parseFloat(dStr); 
      const y = parseFloat(yStr); 
      
      // Soru Sayısı Aşımı Kontrolü
      if (d + y > ders.soru) { 
        hataVar = true; 
        hataMesaji = `${ders.ad} dersinde toplam soru sayısı (${ders.soru}) aşıldı!`; 
        break; 
      } 
      toplamNet += (d - (y / 4)); 
    } 
    
    if (hataVar) { 
      ShowAlert("Hata", hataMesaji, 'error'); 
      return; 
    } 
    if (toplamNet === 0) { 
      ShowAlert("Uyarı", "Lütfen en az bir ders için doğru/yanlış giriniz.", 'warning'); 
      return; 
    } 
    
    const tarih = new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'}); 
    const yeniSonuc = { id: Date.now(), tarih, net: toplamNet, tur: seciliSinav }; 
    const yeniListe = [...sonuclar, yeniSonuc]; 
    setSonuclar(yeniListe); 
    await AsyncStorage.setItem('denemeSonuclari_v2', JSON.stringify(yeniListe)); 
    setGirisler({}); 
    ShowAlert("Başarılı!", `${seciliSinav} Netiniz: ${toplamNet.toFixed(2)}`, 'success'); 
  };
  
  const sifirla = async () => { 
    Alert.alert("Geçmişi Sil", "Tüm deneme analizlerin silinecek.", [ 
      { text: "Vazgeç", style: "cancel" }, 
      { text: "Sil", style: "destructive", onPress: async () => { 
        setSonuclar([]); 
        await AsyncStorage.removeItem('denemeSonuclari_v2'); 
        ShowAlert("Silindi", "Analiz geçmişi temizlendi.", 'warning');
      }} 
    ]); 
  };
  
  const filtrelenmisSonuclar = sonuclar.filter(item => item.tur === seciliSinav);
  const maxNet = Math.max(...filtrelenmisSonuclar.map(s => s.net), 10); 
  
  return ( 
    <LinearGradient colors={['#0f172a', '#075985', '#0e7490']} style={styles.container}> 
      <Text style={styles.baslik}>NET ANALİZİ 📈</Text> 
      
      {/* TYT/AYT/YDT Sekmeleri */}
      <View style={[styles.sinavSecimSatiri, {backgroundColor: 'rgba(255,255,255,0.1)'}]}> 
        {['TYT', 'AYT', 'YDT'].map((tur) => ( 
          <TouchableOpacity key={tur} style={[styles.sinavTab, seciliSinav === tur ? {backgroundColor:'#fbbf24'} : {}]} onPress={() => setSeciliSinav(tur)}> 
            <Text style={[styles.sinavTabYazi, seciliSinav === tur ? {color:'#1e293b'} : {color:'#94a3b8'}]}>{tur}</Text> 
          </TouchableOpacity> 
        ))} 
      </View> 
      
      {/* GRAFİK ALANI */}
      <View style={[styles.grafikKutusu, {backgroundColor: '#020617', borderColor: 'rgba(255,255,255,0.15)'}]}> 
        {filtrelenmisSonuclar.length === 0 ? ( <Text style={{color:'#64748b', textAlign:'center'}}> Henüz {seciliSinav} verisi yok.{'\n'}Aşağıdan ilk netlerini gir! </Text> ) : ( <View style={styles.grafikIcerik}> 
          {filtrelenmisSonuclar.slice(-7).map((item) => { 
            const yukseklik = (item.net / maxNet) * 150; 
            const barHeight = yukseklik > 0 ? yukseklik : 2; 
            return ( 
              <View key={item.id} style={styles.grafikSutun}> 
                <Text style={{color:'white', fontSize:10, marginBottom:5}}>{item.net.toFixed(1)}</Text> 
                <View style={[styles.cubuk, {height: barHeight, backgroundColor: '#fbbf24', shadowColor: '#fbbf24', shadowOpacity: 0.8, shadowRadius: 5, elevation: 5}]} /> 
                <Text style={{color:'#94a3b8', fontSize:10, marginTop:5}}>{item.tarih}</Text> 
              </View> 
            ); 
          })} 
        </View> )} 
      </View> 
      
      {/* NET GİRİŞ FORMU */}
      <ScrollView style={styles.formAlani}> 
        <View style={[styles.girisKutusu, {backgroundColor: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1}]}> 
          <Text style={{color:'white', fontWeight:'bold', marginBottom:15, fontSize:16}}> {seciliSinav} Sonuçlarını Gir </Text> 
          
          {SINAV_KURALLARI[seciliSinav].map((ders) => ( 
            <View key={ders.id} style={styles.dersSatiri}> 
              <Text style={{color:'#fbbf24', width:'30%', fontWeight:'bold', fontSize:16}}>{ders.ad}</Text> 
              <Text style={{color:'#64748b', fontSize:12, width:'10%'}}>({ders.soru})</Text> 
              
              <TextInput style={[styles.inputMini, {backgroundColor: 'rgba(0,0,0,0.5)', color: '#34d399', fontSize: 18}]} placeholder="D" placeholderTextColor="#475569" keyboardType="numeric" maxLength={2} value={girisler[`${seciliSinav}_${ders.id}_d`] || ''} onChangeText={(txt) => veriGirisiYap(ders.id, 'd', txt)} /> 
              
              <TextInput style={[styles.inputMini, {backgroundColor: 'rgba(0,0,0,0.5)', color:'#ef4444', fontSize: 18}]} placeholder="Y" placeholderTextColor="#475569" keyboardType="numeric" maxLength={2} value={girisler[`${seciliSinav}_${ders.id}_y`] || ''} onChangeText={(txt) => veriGirisiYap(ders.id, 'y', txt)} /> 
            
            </View> 
          ))} 
          <TouchableOpacity style={[styles.hesaplaButon, {backgroundColor: '#2563eb'}]} onPress={hesaplaVeKaydet}> <Text style={{color:'white', fontWeight:'bold'}}>HESAPLA & KAYDET</Text> </TouchableOpacity> 
        </View> <View style={{height: 100}} /> 
      </ScrollView> 
      
      {/* SIFIRLAMA BUTONU */}
      {sonuclar.length > 0 && ( <TouchableOpacity onPress={sifirla} style={{position:'absolute', top: 50, left: 20}}> <Ionicons name="trash-outline" size={24} color="#64748b" /> </TouchableOpacity> )} 
    </LinearGradient> 
  );
}
// =====================================================================
// 5. EKRAN: ZİNCİR (Hata Giderildi)
// =====================================================================
function ZincirEkrani() {
  const [gecmis, setGecmis] = useState({}); 
  const [zincirSayisi, setZincirSayisi] = useState(0); 
  const [gunlukHedef, setGunlukHedef] = useState('1'); 
  const [hedefGecmisi, setHedefGecmisi] = useState({});

  const son30Gun = [...Array(28)].map((_, i) => { 
    const d = new Date(); 
    d.setDate(d.getDate() - i); 
    return d.toISOString().split('T')[0]; 
  }).reverse();

  // Zincir Ekranı İçine Özel Helper Fonksiyonu
  const oGununHedefiniGetir = (tarihStr, gecmisTablosu, sonHedef) => { 
    if (gecmisTablosu[tarihStr]) return gecmisTablosu[tarihStr]; 
    const tarihler = Object.keys(gecmisTablosu).sort(); 
    const oncekiTarihler = tarihler.filter(t => t < tarihStr); 
    if (oncekiTarihler.length > 0) { 
        const enYakinTarih = oncekiTarihler[oncekiTarihler.length - 1]; 
        return gecmisTablosu[enYakinTarih]; 
    } 
    return sonHedef || 1; 
  };

  const zinciriHesapla = (veri, hGecmisi, sonHedef) => { 
    let sayac = 0; 
    const bugun = new Date(); 
    for (let i = 0; i < 365; i++) { 
      const d = new Date(); 
      d.setDate(bugun.getDate() - i); 
      const tarihStr = d.toISOString().split('T')[0]; 
      const oGunkuSure = veri[tarihStr] ? veri[tarihStr].ders / 60 : 0; 
      const hedef = oGununHedefiniGetir(tarihStr, hGecmisi, sonHedef); 
      if (oGunkuSure >= hedef) { 
        sayac++; 
      } else if (i === 0) { 
        continue; 
      } else { 
        break; 
      } 
    } 
    setZincirSayisi(sayac); 
  };
  
  useEffect(() => { verileriCek(); }, []);
  
  const verileriCek = async () => { 
    const kayitliGecmis = await AsyncStorage.getItem('gecmisListesi'); 
    const kayitliHedef = await AsyncStorage.getItem('gunlukHedef'); 
    const kayitliHedefGecmisi = await AsyncStorage.getItem('hedefGecmisi'); 
    
    let hGecmisi = {}; 
    if (kayitliHedefGecmisi) hGecmisi = JSON.parse(kayitliHedefGecmisi); 
    setHedefGecmisi(hGecmisi); 
    
    let hedefSayi = 1;
    if (kayitliHedef) {
        setGunlukHedef(kayitliHedef); 
        hedefSayi = parseInt(kayitliHedef);
    }
    
    if (kayitliGecmis) { 
      const veri = JSON.parse(kayitliGecmis); 
      setGecmis(veri); 
      zinciriHesapla(veri, hGecmisi, hedefSayi); 
    } 
  };
  
  const hedefiKaydet = async () => { 
    const sayiHedef = parseInt(gunlukHedef); 
    if (!isNaN(sayiHedef) && sayiHedef > 0) { 
      const bugunTarih = new Date().toISOString().split('T')[0]; 
      const yeniHedefGecmisi = { ...hedefGecmisi, [bugunTarih]: sayiHedef }; 
      setHedefGecmisi(yeniHedefGecmisi); 
      await AsyncStorage.setItem('hedefGecmisi', JSON.stringify(yeniHedefGecmisi)); 
      await AsyncStorage.setItem('gunlukHedef', sayiHedef.toString()); 
      zinciriHesapla(gecmis, yeniHedefGecmisi, sayiHedef); 
    } else { 
      setGunlukHedef('1'); 
      ShowAlert("Uyarı", "Geçerli bir sayı giriniz.", 'warning'); 
    } 
  };

  return ( 
     <LinearGradient colors={['#4667b4ff', '#1078afff', '#379ebaff']} style={styles.container}> 
      <Text style={styles.baslik}>ZİNCİRİ KIRMA 🔗</Text> 
      <View style={[styles.hedefKarti, {backgroundColor: 'rgba(255,255,255,0.05)'}]}> <View> <Text style={{color:'#94a3b8', fontSize:12, fontWeight:'bold', marginBottom: 5}}>BUGÜNKÜ HEDEF</Text> <View style={{flexDirection:'row', alignItems:'center'}}> <TextInput style={{ color: 'white', fontSize: 32, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#fbbf24', paddingBottom: 0, minWidth: 50 }} value={gunlukHedef} onChangeText={setGunlukHedef} onEndEditing={hedefiKaydet} keyboardType="numeric" returnKeyType="done" maxLength={3} /> <Text style={{color:'#94a3b8', fontSize:14, marginLeft:5, alignSelf:'flex-end', marginBottom:5}}>dk</Text> </View> <Text style={{color:'#64748b', fontSize:10, marginTop:2}}>Değişince eskiler bozulmaz.</Text> </View> <View style={{alignItems:'flex-end'}}> <Text style={{color:'#94a3b8', fontSize:12, fontWeight:'bold'}}>MEVCUT SERİ</Text> <Text style={{color:'#10b981', fontSize:32, fontWeight:'bold'}}>{zincirSayisi} <Text style={{fontSize:14, color:'#10b981'}}>Gün</Text></Text> </View> </View> <Text style={{color:'#cbd5e1', marginBottom: 20, fontSize: 12, fontStyle:'italic'}}> {zincirSayisi > 0 ? "Harika gidiyorsun, seriyi bozma!" : "Bugün başla, zinciri kur!"} </Text> <TouchableOpacity onPress={verileriCek} style={[styles.yenileButon, {backgroundColor: 'rgba(255,255,255,0.1)'}]}> <Ionicons name="refresh" size={18} color="white" /> <Text style={{color:'white', marginLeft:5, fontWeight:'bold', fontSize:12}}>Tabloyu Güncelle</Text> </TouchableOpacity> <View style={styles.takvimKutusu}> {son30Gun.map((tarih) => { const sureDakika = gecmis[tarih] ? Math.floor(gecmis[tarih].ders / 60) : 0; const hedef = oGununHedefiniGetir(tarih, hedefGecmisi, parseInt(gunlukHedef)); const basarili = sureDakika >= hedef; const gun = tarih.split('-')[2]; return ( <View key={tarih} style={styles.gunKutusu}> <View style={[styles.zincirHalka, basarili ? {backgroundColor:'#34d399', borderColor:'#34d399', shadowColor: '#34d399', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5} : {backgroundColor:'rgba(0,0,0,0.2)', borderColor:'rgba(255,255,255,0.1)'}]}> {basarili ? ( <Ionicons name="checkmark" size={18} color="white" /> ) : ( <Text style={{color:'rgba(255,255,255,0.7)', fontSize:12, fontWeight:'bold'}}>{gun}</Text> )} </View> </View> ); })} </View> </LinearGradient> );
}
// =====================================================================
// ANA NAVİGASYON
// =====================================================================
const Tab = createBottomTabNavigator();

export default function App() {
  const [alertProps, setAlertProps] = useState({ visible: false, title: '', message: '', type: 'info' });
  
  useEffect(() => {
    setGlobalAlert = setAlertProps;
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: '#0f172a', 
            borderTopColor: '#334155',
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: '#fbbf24', 
          tabBarInactiveTintColor: '#64748b', 
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Sayaç') iconName = focused ? 'timer' : 'timer-outline';
            else if (route.name === 'Ders Takip') iconName = focused ? 'list' : 'list-outline';
            else if (route.name === 'Analiz') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            else if (route.name === 'Zincir') iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            else if (route.name === 'Ajanda') iconName = focused ? 'calendar' : 'calendar-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Sayaç" component={SayacEkrani} />
        <Tab.Screen name="Ajanda" component={AjandaEkrani} options={{ tabBarLabel: 'Planla' }} />
        <Tab.Screen name="Ders Takip" component={KonularEkrani} options={{ tabBarLabel: 'Dersler' }} />
        <Tab.Screen name="Analiz" component={AnalizEkrani} />
        <Tab.Screen name="Zincir" component={ZincirEkrani} />
      </Tab.Navigator>
      <StatusBar style="light" />
      
      <CustomAlert 
        visible={alertProps.visible} 
        title={alertProps.title} 
        message={alertProps.message} 
        type={alertProps.type} 
        onClose={() => setAlertProps({ ...alertProps, visible: false })} 
      />
    </NavigationContainer>
  );
}

// =====================================================================
// STİLLER (FINAL)
// =====================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center' },
  
  istatistikButon: { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 50, zIndex: 10 },
  baslik: { fontSize: 32, fontWeight: 'bold', color: '#fbbf24', marginBottom: 20, letterSpacing: 2, marginTop: 40 },
  
  // MOTİVASYON KUTUSU
  sozKutusu: { width: '85%', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth:1 },
  istatistikSatiri: { flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginBottom: 20 },
  kucukKutu: { padding: 15, borderRadius: 15, width: '48%', alignItems: 'center' },
  kucukBaslik: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' },
  kucukSayi: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  
  // SAYAÇ KUTUSU (YÜKSEKLİK KALDIRILDI VE SADELEŞTİRİLDİ)
  sayacKutusu: { 
    padding: 30, 
    borderRadius: 20, 
    alignItems: 'center', 
    width: '85%', 
    justifyContent: 'center',
    overflow: 'hidden',
  },
  kalanZamanBaslik: { color: '#94a3b8', fontSize: 16, marginBottom: 10 },
  kalanZaman: { fontSize: 40, fontWeight: 'bold', color: '#fff' },
  kalanSaat: { fontSize: 24, color: '#e2e8f0', marginTop: 5, fontVariant: ['tabular-nums'] },
  kronometre: { fontSize: 70, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  
  butonSatiri: { flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginTop: 40 },
  buyukButon: { padding: 15, borderRadius: 50, width: '100%', alignItems: 'center' },
  yarimButon: { padding: 15, borderRadius: 50, width: '48%', alignItems: 'center' },
  butonYazi: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  
  modalContainer: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50, alignItems: 'center' },
  modalBaslik: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  listeElemani: { backgroundColor: '#334155', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tarihYazi: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  kapatButon: { backgroundColor: '#ef4444', padding: 15, borderRadius: 50, width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 20 },

  ilerlemeKutusu: { width: '90%', backgroundColor: 'rgba(0,0,0,0.4)', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(251, 191, 36, 0.3)', marginBottom: 20 },
  
  // DERS KARTLARI STİLİ
  dersKarti: { backgroundColor: '#1e1b4b', padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  dersBaslik: { color: 'white', fontSize: 20, fontWeight: 'bold' }, 
  sinavSecimSatiri: { flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginBottom: 15, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 5 },
  sinavTab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 8 },
  sinavTabYazi: { color: '#94a3b8', fontWeight: 'bold', fontSize: 12 },
  
  konuSatiri: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1b4b', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  konuYazi: { color: '#e2e8f0', fontSize: 16, fontWeight: 'bold' },
  tikKutusu: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },

  // ANALİZ STİLLERİ
  formAlani: { width: '100%', paddingHorizontal: '5%' },
  dersSatiri: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 5 },
  inputMini: { padding: 8, borderRadius: 8, textAlign: 'center', fontWeight: 'bold', width: 50 },
  grafikKutusu: { width: '90%', height: 220, backgroundColor: '#020617', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 20, padding: 10 },
  grafikIcerik: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', height: '100%', paddingBottom: 10 },
  grafikSutun: { alignItems: 'center', width: 30 },
  cubuk: { width: 12, backgroundColor: '#fbbf24', borderRadius: 5 },
  girisKutusu: { width: '90%', backgroundColor: 'rgba(0,0,0,0.3)', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  hesaplaButon: { backgroundColor: '#4338ca', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },

  // ZİNCİR/AJANDA
  hedefKarti: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 10 },
  yenileButon: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 20, marginBottom: 20, alignItems: 'center' },
  takvimKutusu: { flexDirection: 'row', flexWrap: 'wrap', width: '90%', justifyContent: 'center' },
  gunKutusu: { width: '14%', alignItems: 'center', marginBottom: 10 },
  zincirHalka: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  ajandaSatiri: { flexDirection:'row', width:'90%', backgroundColor:'rgba(0,0,0,0.3)', borderRadius:15, padding:15, marginBottom:10, alignItems:'center' },
  tarihKutusu: { backgroundColor:'rgba(255,255,255,0.1)', padding:10, borderRadius:10, alignItems:'center', marginRight:15, width:60 },
  planIcerik: { flex:1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  hedefModal: { width: '80%', backgroundColor: '#1e1b4b', padding: 30, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  planInput: { width: '100%', backgroundColor: '#0f172a', color: 'white', padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 20, height: 100, textAlignVertical: 'top' },
  kaydetButon: { backgroundColor: '#10b981', paddingVertical: 12, borderRadius: 10, width: '100%', alignItems: 'center' },

  // ALERT EK STİLLERİ
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertKutusu: {
    width: '80%',
    backgroundColor: '#020617',
    padding: 25,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
  },
  alertBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  alertMesaj: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButon: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  alertButonYazi: {
    color: 'white',
    fontWeight: 'bold',
  }
});