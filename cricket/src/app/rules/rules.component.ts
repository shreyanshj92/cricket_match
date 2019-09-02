import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.scss"]
})
export class RulesComponent implements OnInit {
  rules = [
    {
      id: 1,
      rule: "प्रत्येक टीम में अधिकतम 6 खिलाड़ी होंगे |"
    },
    {
      id: 2,
      rule: "प्रत्येक टीम में एक कप्तान होना जरुरी है |"
    },
    {
      id: 3,
      rule:
        "प्रत्येक टीम में 2 Batsman , 2 Bowler  और 1 All rounder खिलाड़ी होंगे |"
    },
    {
      id: 4,
      rule:
        "आपको अपनी टीम का नाम स्वयं बताना है और कप्तान का नाम भी टीम के खिलाड़ी मिलके बताएंगे |"
    },
    {
      id: 5,
      rule:
        "प्रत्येक टीम में कम से कम एक खिलाड़ी होना जरुरी है, जिसकी उम्र १२ बर्ष से कम हो |"
    },
    {
      id: 6,
      rule: "प्रत्येक टीम को 6 ओवर खेलने का मौका मिलेगा |"
    },
    {
      id: 7,
      rule:
        "अगर किसी भी धर्म-प्रेमी बंधू को लगता है कि किसी प्रश्न या उत्तर में गलती है तो उसको कार्यक्रम के उपरांत सही किआ जायेगा |"
    },
    {
      id: 8,
      rule:
        "प्रत्येक टीम को अगर प्रश्न में 'क्रोध, मान, माया, लोभ' आता है तो वो खिलाड़ी Bowled माना जायेगा |"
    },
    {
      id: 9,
      rule:
        "प्रत्येक टीम को अगर प्रश्न में 'सम्यक दर्शन = Dot  ball, सम्यक ज्ञान = Wide ball, सम्यक चारित्र = No ball' आता है तो वो खिलाड़ी को Wide और No बाल का रन मिलेगा |"
    }
  ];
  constructor() {}

  ngOnInit() {}
}
