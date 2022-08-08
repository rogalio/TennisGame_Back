let Match = class {
  sets = [];
  Set_joueur_1 = 0;
  Set_joueur_2 = 0;
  gagnant = 0;
  fin_match = false;
  nb_points_consumee = 0;

  // jouer un match

  start = (Points_Generee) => {
    while (this.Set_joueur_1 < 3 && this.Set_joueur_2 < 3) {
      let set = new Tset();
      set.start(this, Points_Generee);
      this.sets.push(set);
      if (this.fin_match) {
        console.log("-------------------------------------");
        console.log("❌ Not enough points");
        console.log("-------------------------------------");
        return;
      }
    }

    console.log("-------------------------------------");

    if (this.Set_joueur_1 > this.Set_joueur_2) {
      this.gagnant = 1;
      console.log(`🏆 winner is player 1`);
    } else {
      this.gagnant = 2;
      console.log(`🏆 winner is player 2`);
    }

    console.log("-------------------------------------");
  };
};
let Tset = class {
  jeux = [];
  Jeux_joueur_1 = 0;
  Jeux_joueur_2 = 0;

  start = (match, Points_Generee) => {
    while (
      Math.max(this.Jeux_joueur_1, this.Jeux_joueur_2) < 6 ||
      Math.abs(this.Jeux_joueur_1 - this.Jeux_joueur_2) < 2
    ) {
      let jeu = new Jeu();

      if (this.Jeux_joueur_1 === 6 && this.Jeux_joueur_2 === 6) {
        jeu.decisif = true;
        jeu.start(this, match, Points_Generee);
        this.jeux.push(jeu);
        break;
      } else {
        jeu.start(this, match, Points_Generee);
        this.jeux.push(jeu);
      }

      console.log(
        `▶ Max Jeux : ${Math.max(
          this.Jeux_joueur_1,
          this.Jeux_joueur_2
        )} | ecart: ${Math.abs(this.Jeux_joueur_1 - this.Jeux_joueur_2)}`
      );

      if (match.fin_match) return;
    }

    console.log("=====================================");

    if (this.Jeux_joueur_1 > this.Jeux_joueur_2) {
      match.Set_joueur_1 += 1;
      console.log(`${match.Set_joueur_1} sets for player 1`);
    } else {
      match.Set_joueur_2 += 1;
      console.log(`${match.Set_joueur_2} sets for player 2`);
    }
    console.log("=====================================");
  };
};
let Jeu = class {
  Points_joueur_1 = 0;
  Points_joueur_2 = 0;
  Joueur_1_Score = "0";
  Joueur_2_Score = "0";
  decisif = false;

  // jouer un jeu

  start = (set, match, Points_Generee) => {
    while (
      (Math.max(this.Points_joueur_1, this.Points_joueur_2) < 4 &&
        !this.decisif) ||
      (Math.max(this.Points_joueur_1, this.Points_joueur_2) < 7 &&
        this.decisif) ||
      Math.abs(this.Points_joueur_1 - this.Points_joueur_2) < 2
    ) {
      if (Points_Generee[match.nb_points_consumee] === 1) {
        this.Points_joueur_1 += 1;
        console.log(`${this.Points_joueur_1} points for player 1`);
      } else {
        this.Points_joueur_2 += 1;
        console.log(`${this.Points_joueur_2} points for player 2`);
      }

      if (match.nb_points_consumee === Points_Generee.length) {
        match.fin_match = true;
        return;
      }
      match.nb_points_consumee += 1;

      console.log(
        `Max points : ${Math.max(this.Points_joueur_1, this.Points_joueur_2)} `
      );
      console.log(`Score : ${this.score()}`);
    }

    console.log("-------------------------------------");

    if (this.Points_joueur_1 > this.Points_joueur_2) {
      set.Jeux_joueur_1 += 1;
      console.log(`${set.Jeux_joueur_1} jeux for player 1`);
    } else {
      set.Jeux_joueur_2 += 1;
      console.log(`${set.Jeux_joueur_2} jeux for player 2`);
    }
    console.log("-------------------------------------");
  };

  score = () => {
    const Score_notation = ["0", "15", "30", "40"];

    if (!this.decisif) {
      if (this.Points_joueur_1 >= 0 && this.Points_joueur_1 < 4)
        this.Joueur_1_Score = Score_notation[this.Points_joueur_1];

      if (this.Points_joueur_2 >= 0 && this.Points_joueur_2 < 4)
        this.Joueur_2_Score = Score_notation[this.Points_joueur_2];

      if (this.Points_joueur_1 >= 4 || this.Points_joueur_2 >= 4)
        if (this.Points_joueur_1 > this.Points_joueur_2) {
          this.Joueur_1_Score = "AV";
          this.Joueur_2_Score = "-";
        } else if (this.Points_joueur_1 < this.Points_joueur_2) {
          this.Joueur_1_Score = "-";
          this.Joueur_2_Score = "AV";
        } else {
          this.Joueur_1_Score = "40";
          this.Joueur_2_Score = "40";
        }
    } else {
      this.Joueur_1_Score = this.Points_joueur_1;
      this.Joueur_2_Score = this.Points_joueur_2;
    }

    return `${this.Joueur_1_Score} | ${this.Joueur_2_Score}`;
  };
};

module.exports = { Match };
