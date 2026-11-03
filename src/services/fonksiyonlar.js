import { supabase } from './supabase.js';

//takvimde grup adına tıkladığı zaman önüne çıkacak kasların listesi 
export async function grubaGoreHareketleriGetir(grupAdi) {
    const { data , error} = await supabase.from("kaslar").select("*, hareket_kas_etkisi(*)").eq("kas_grubu",grupAdi).gte("hareket_kas_etkisi.etki_seviyesi",51);
    
    if(error){
        console.log("hata oluştu",error)
        return[];
    }

    return data;
}

//takvimde antrenman oluştur ksmına girdiği zaman çıkacak kas grupları listesi
export async function kasGruplariniGetir() {
    const {data , error} = await supabase.from("kaslar").select("kas_grubu");

    if(error){
        console.log("hata oluştu",error);
        return[];
    }

    //alt alta bir kaç defa aynı grubu yazmasın diye
    const tekilGruplar = [...new Set(data.map((item) => item.kas_grubu))];
    return tekilGruplar;
}

//İnsan modelinde kasa tıklanınca videoların sıralanması için
export async function kasaGoreHareketleriGetir(secilenKas) {
    const {data,error} = await supabase.from("hareket_kas_etkisi").select("*, hareketler(video_url)").eq("kas_adi", secilenKas).order("etki_seviyesi", {ascending: false});
    
    if(error){
        console.log("hata var ", error);
        return[];
    }

    console.log(secilenKas + " kasını çalıştıran hareketler:", data);
    return data;
}

export async function hareketAra(arananKelime) {
    const {data, error} = await supabase.from("hareketler").select("*").ilike("hareket_adi","%"+arananKelime+"%");

    if(error){
        console.log("hata var ", error);
        return[];
    }
    
    return data;
}

