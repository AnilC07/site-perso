import SectionHeading from "../../SectionHeading";
import FilterButton from "../../UI/FilterButton";
import { BsTrash } from "react-icons/bs";

import { competences, projets } from "../../../data";

import "./Realisations.css";
import ProjectCard from "../../UI/ProjectCard";

import { useEffect, useState } from "react";

const Realisations = () => {
  const [filteredProject, setFilteredProject] = useState(projets);
  const [selectedCompetence, setSelectedCompetence] = useState([
    "Tous les projets",
  ]);

  /**
   * Fonction qui set les compétences selectionnées
   * @param {*} e
   */
  const setProjectsToDisplay = (e) => {
    e.preventDefault();
    // Récupere la valeur correspondante au boutton clické
    const selectedTag = e.target.value;
    console.log(e);

    // Verifier si la valeur clické et deja présente
    if (selectedCompetence.includes(selectedTag)) {
      // Si oui, on la retire de la variable d'état
      setSelectedCompetence((prev) => prev.filter((el) => el !== selectedTag));
    } else if (!selectedCompetence.includes(selectedTag)) {
      // Sinon, on rajoute la nouvelle valeur
      // Injecte la valeur du boutton selectionée dans une variable d'état
      setSelectedCompetence((prev) => [...prev, selectedTag]);
    }

    if (
      selectedCompetence[0] === "Tous les projets" &&
      selectedCompetence.length > 0
    ) {
      setSelectedCompetence((prev) => {
        const shallowCopy = [...prev];
        console.log(shallowCopy);
        shallowCopy.splice(0, 1);
        console.log(shallowCopy);
        return shallowCopy;
      });
    }
  };

  const removeCompetence = (competence) => {
    console.log({ competence });
    if (selectedCompetence.includes(competence)) {
      setSelectedCompetence((prev) => prev.filter((el) => el !== competence));
    }
  };

  const resetCompetence = () => {
    setSelectedCompetence(["Tous les projets"]);
    const option = document.querySelector("option")
    
    if(option.getAttribute("selected")) {
      option.removeAttribute("selected");
    }
    if(!option.getAttribute("selected")) {
      option.setAttribute("selected", true)
    }
  };

  /**
   * Fonction qui filtre les projets suivant les compétence selectionnées
   * @param {[String]} selectedTag
   */
  const filter = (selectedCompetence) => {
    // Verifie la valeur du boutton clické

    if (selectedCompetence.length > 1) {
      // Si selectedCompetence est un array avec plus d'1 elements, on boucle dessus et ajoute les projets correspondant dans la variable d'état
      let arr = [];
      selectedCompetence.map((competence) => {
        return arr.push(
          projets.filter((el) => el.tags.join(" ").includes(competence))
        );
        //     // return setFilteredProject((prev) =>[...prev, competence.filter(el=>el.tags.join(" ").includes(selectedCompetence) === competence)])
      });
      arr = arr.flat();

      // Réarrange l'array pour afficher des items de facons unique.
     arr = [...new Set(arr)] 
      console.log(arr);
      setFilteredProject(arr);
    } else {
      // Si différent de 'Tous les projets', filtre les projets ayant le tag associé à la valeur du boutton
      const projetFiltrer = projets.filter((el) =>
        el.tags.join(" ").includes(selectedCompetence)
      );
      setFilteredProject(projetFiltrer);
      if (selectedCompetence[0] === "Tous les projets") {
        // Si oui, inject tous les projets dans la variable d'état. État par défault.
        setFilteredProject(projets);
      }
    }
    if (selectedCompetence.length === 0) {
      setSelectedCompetence(["Tous les projets"]);
    }
  };

  useEffect(() => {
    // if(selectedCompetence === null){
    //   setSelectedCompetence(['Tous les projets'])
    // }
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
          <div className="select">
            <select onChange={setProjectsToDisplay}>
              {competences.map((el) => {
                const { id, competence } = el;
                return (
                  <option
                    key={id}
                    value={competence}
                    onClick={setProjectsToDisplay}
                    // selected={!selectedCompetence || selectedCompetence === ['Tous les projets'] ? true : false}
                  >
                    {competence}
                  </option>
                );
              })}
            </select>
            {selectedCompetence.length > 0 &&
              selectedCompetence[0] !== "Tous les projets" && (
                <div className="reset" onClick={resetCompetence}>
                  <BsTrash />
                </div>
              )}
          </div>
        </div>
        <div className="infoFiltre">
          {selectedCompetence.map((el, idx) => {
            return (
              <p key={idx} onClick={() => removeCompetence(el)}>
                <span className="choisis">{el}</span>
              </p>
            );
          })}
        </div>
        <div className="projectsWrapper">
          <div className="projects">
            {filteredProject.map((projet) => {
              return <ProjectCard key={projet.id} {...projet} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Realisations;
