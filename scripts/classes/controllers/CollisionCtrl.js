define([], function() {
  function CollisionCtrl(zklUd) {
    //objekt kontroluje kolizi

    var zakladniUdaje = zklUd;
    var nepratele = zakladniUdaje.getNepratele();
    var delo = zakladniUdaje.getDelo();
    var strely = [];

    //objekty pro přehlednější zjišťování kolize v cyklu
    var Sourad = function(x, y, rozmer) {
      this.zacX = x;
      this.konX = x + rozmer;
      this.zacY = y;
      this.konY = y + rozmer;
    }


    //načtení střel
    for (i = 0; i < delo.length; i++) {
      strely[i] = delo[i].strely;
    }

    this.update = function() {
      nepratele = zakladniUdaje.getNepratele();
      //prolistování každého směru
      //jeden směr = i
      for (i = 0; i < nepratele.length; i++) {
        //prolistovaní každého nepřítele v jednom směr
        //pořadí nepřítele ve směru = j
        for (j = 0; j < nepratele[i].length; j++) {
          if (nepratele[i][j] !== undefined) {
            nepr = new Sourad(nepratele[i][j].getXY().x, nepratele[i][j].getXY().y, nepratele[i][j].getXY().rozmer);
            //cyklus pro prolistování všemi střelami
            //střela v jednom směru = k
            for (k = 0; k < strely[i].length; k++) {
              //test, zda střela existuje
              if (strely[i][k] !== undefined) {
                  str = new Sourad(strely[i][k].getXY().x, strely[i][k].getXY().y, strely[i][k].getXY().rozmer);
                  //test pro kolizi
                  if (/*Zleva*/str.konX >= nepr.zacX && str.zacX <= nepr.zacX &&  str.zacY >= nepr.zacY && str.konY <= nepr.konY ||
                      /*Zprava*/str.konX >= nepr.konX && str.zacX <= nepr.konX && str.zacY >= nepr.zacY && str.konY <= nepr.konY ||
                      /*Zeshora*/str.zacX >= nepr.zacX && str.konX <= nepr.konX && str.konY >= nepr.zacY && str.zacY <= nepr.zacY ||
                      /*Zespodu*/str.zacX >= nepr.zacX && str.konX <= nepr.konX && str.zacY <= nepr.konY && str.konY >= nepr.koncY
                  ) {
                    nepratele[i][j].odectiZivot();
                    strely[i][k].mimo = true;
                  }
              }
            }

            if (nepratele[i][j].getPohyb()["konec"] == true) {
              nepratele[i][j] = undefined;
            }
          }
        }
      }
    }

    this.getStrely = function() {
      return strely;
    }

  }


  return CollisionCtrl;
})
