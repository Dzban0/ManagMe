import { useState } from "react";
import { api } from "../services/api";

export const ProjectForm = ({
	onProjectAdded,
	projectToEdit,
	onCancelEdit,
}) => {
	const [name, setName] = useState(
		projectToEdit ? projectToEdit.name : ""
	);
	const [description, setDescription] = useState(
		projectToEdit ? projectToEdit.description : ""
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newProject = {
		  id: projectToEdit ? projectToEdit.id : Date.now(),
		  name,
		  description,
		};
		if (projectToEdit) {
		  api.updateProject(newProject);
		} else {
		  api.addProject(newProject);
		}
		onProjectAdded(api.getProjects());
		setName("");
		setDescription("");
	  };

	return (
		<form onSubmit={handleSubmit} className="mb-6">
			<div className="grid grid-cols-1 gap-4">
				<input
					type="text"
					placeholder="Nazwa projektu"
					value={name}
					onChange={(e) =>
						setName(
							e.target
								.value
						)
					}
					className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="text"
					placeholder="Opis"
					value={description}
					onChange={(e) =>
						setDescription(
							e.target
								.value
						)
					}
					className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<div className="flex space-x-2">
					<button
						type="submit"
						className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
					>
						{projectToEdit
							? "Zapisz zmiany"
							: "Dodaj projekt"}
					</button>
					{projectToEdit && (
						<button type="button" onClick={ onCancelEdit } className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors">
							Anuluj
						</button>
					)}
				</div>
			</div>
		</form>
	);
};
