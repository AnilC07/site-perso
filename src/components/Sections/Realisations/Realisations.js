import SectionHeading from "../../SectionHeading";
import FilterButton from "../../UI/FilterButton";

import { competences, projets } from "../../../data";

import "./Realisations.css";
import ProjectCard from "../../UI/ProjectCard";

import { useEffect, useState } from "react";

const Realisations = () => {
  const [filteredProject, setFilteredProject] = useState(projets);
  // const [selectedCompetence, setSelectedCompetence] = useState([
  //   "Tous les projets",
  // ]);
  const [selectedCompetence, setSelectedCompetence] = useState([]);
  // console.log([] === null);

  /**
   * Fonction qui set les compétences selectionnées
   * @param {*} e
   */
  const setProjectsToDisplay = (e) => {
    // Récupere la valeur correspondante au boutton clické
    const selectedTag = e.target.value;

    // Verifier si la valeur clické et deja présente
    if (selectedCompetence.includes(selectedTag)) {
      // Si oui, on la retire de la variable d'état
      setSelectedCompetence((prev) => prev.filter((el) => el !== selectedTag));
    } else {
      // Sinon, on rajoute la nouvelle valeur
      // Injecte la valeur du boutton selectionée dans une variable d'état
      setSelectedCompetence((prev) => [...prev, selectedTag]);
    }
    //         if(selectedCompetence.join(" ").includes(selectedCompetence) !== 'Tous les projets'){
    // console.log('hello world')

    //     }
    if (selectedCompetence === []) {
      setSelectedCompetence(["Tous les projets"]);
    }
  };

  /**
   * Fonction qui filtre les projets suivant les compétence selectionnées
   * @param {[String]} selectedTag
   */
  const filter = (selectedCompetence) => {
    // Verifie la valeur du boutton clické

    if (selectedCompetence[0] === "Tous les projets") {
      // Si oui, inject tous les projets dans la variable d'état. État par défault.
      setFilteredProject(projets);
    }
    if (selectedCompetence === []) {
      // Si oui, inject tous les projets dans la variable d'état. État par défault.
      setSelectedCompetence(["Tous les projets"]);
      setFilteredProject(projets);
    }

    if (selectedCompetence.length > 1) {
      // Si selectedCompetence est un array avec plus d'1 elements, on boucle dessus et ajoute les projets correspondant dans la variable d'état
      let arr = [];
      selectedCompetence.map((competence) => {
       return arr.push(
          projets.filter((el) => el.tags.join(" ").includes(competence))
        );
        //     // return setFilteredProject((prev) =>[...prev, competence.filter(el=>el.tags.join(" ").includes(selectedCompetence) === competence)])
      });
      arr= arr.flat();
      console.log(arr)
      setFilteredProject(arr);
    } else {
      // Si différent de 'Tous les projets', filtre les projets ayant le tag associé à la valeur du boutton
      const projetFiltrer = projets.filter((el) =>
        el.tags.join(" ").includes(selectedCompetence)
      );
      setFilteredProject(projetFiltrer);
    }
  };

  useEffect(() => {
    // setSelectedCompetence(["Tous les projets"]);
    filter(selectedCompetence);
  }, [selectedCompetence]);

  useEffect(() => {
    filter(selectedCompetence);
  }, [selectedCompetence]);

  return (
    <section id="realisations">
      <SectionHeading>Réalisations</SectionHeading>
      <div className="projects-container">
        <div className="filter">
          <div className="filter-btn">
            {competences.map((el) => {
              const { id, competence } = el;
              return (
                <FilterButton
                  key={id}
                  id="filter"
                  competence={competence}
                  filterOnClick={setProjectsToDisplay}
                  selected={selectedCompetence}
                />
              );
            })}
          </div>
          {/*  */}
        </div>
        <div className="projects">
          {filteredProject.map((projet) => {
            return <ProjectCard key={projet.id} {...projet} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Realisations;
