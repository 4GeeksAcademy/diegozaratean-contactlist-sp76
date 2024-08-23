const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			],
			contacts: [
				{
					name: "contacto 1",
					address: "dir 1"
				},
				{
					name: "contacto 2",
					address: "dir 2"
				}
				,
				{
					name: "contacto 3",
					address: "dir 3"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log('loadSomeData')
				setStore({ contacts: [{
					name: "contacto 1 useefect",
					address: "dir 1"
				},
				{
					name: "contacto 2 useefect",
					address: "dir 2"
				}
				] });
				fetch('https://playground.4geeks.com/contact/agendas/marypoppins/contacts')
				.then( (reponse)=> reponse.json())
				// .then( (data)=> console.log(data.contacts) )
				.then( (data)=> setStore({ contacts: data.contacts }) )

				
			},
			deleteContact: (indexToDelete) => {
				console.log('deleteContact desde flux',indexToDelete)
				const store = getStore();
				console.log(store.contacts)
				console.log(store.contacts.filter( (elemento,index)=> index != indexToDelete ))
				// setStore({ contacts: store.contacts.filter( (elemento,index)=> index != indexToDelete ) });
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				fetch("https://playground.4geeks.com/contact/agendas/marypoppins/contacts/"+indexToDelete, requestOptions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result)
					fetch('https://playground.4geeks.com/contact/agendas/marypoppins/contacts')
					.then( (reponse)=> reponse.json())
					// .then( (data)=> console.log(data.contacts) )
					.then( (data)=> setStore({ contacts: data.contacts }) )

				})
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
