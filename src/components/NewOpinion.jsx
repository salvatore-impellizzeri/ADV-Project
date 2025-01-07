import { useActionState } from "react";

export function NewOpinion() {
  function newOpinionAction(prevFormState, formData){
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];
    const namePattern = /^[A-Za-z\s]+$/;

    if(!userName){
      errors.push('Inserisci il tuo nome');
    }

    if(userName.length > 30 || userName.length < 2 && userName){
      errors.push('Il nome deve essere compreso tra 2 e 50 caratteri');
    }

    if(!namePattern.test(userName) && userName){
      errors.push('Inserisci un nome valido')
    }

    if(!title){
      errors.push('Inserisci il titolo');
    }

    if(title.length > 50){
      errors.push('Inserisci un titolo minore di minore o uguale di 50 caratteri');
    }

    if(!body){
      errors.push('Inserisci la tua opinione');
    }


    if(errors.length > 0){
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body
        }
      }
    }

    return {errors : null}
  }

  const [formState, formAction] = useActionState(newOpinionAction, {errors: null})

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body} ></textarea>
        </p>
        
        {
          formState.errors && (
            <ul className="errors">
              {formState.errors.map((error) => (
                <li key={error}>
                  {error}
                </li>
              ))}
            </ul>
          )
        }

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
