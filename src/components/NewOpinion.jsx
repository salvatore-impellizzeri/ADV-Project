import { useActionState, use } from "react";

import { OpinionsContext } from '../store/opinions-context';

export function NewOpinion() {

  const {addOpinion} = use(OpinionsContext);

  async function newOpinionAction(prevFormState, formData){
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];
    const namePattern = /^[A-Za-z\s]+$/;

    if (!userName) {
      errors.push("Please enter your name");
    }

    if (userName.trim().length > 30 || (userName.trim().length < 2 && userName)) {
      errors.push("The name must be between 2 and 50 characters");
    }

    if (!namePattern.test(userName) && userName) {
      errors.push("Please enter a valid name");
    }

    if (!title) {
      errors.push("Please enter a title");
    }

    if (title.trim().length > 50) {
      errors.push("The title must be 50 characters or fewer");
    }

    if (!body) {
      errors.push("Please enter your opinion");
    }

    if ((body.trim().length < 10 || body.trim().length > 300) && body) {
      errors.push("The Opinion must be between 10 and 300 characters");
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

    await addOpinion({ userName, title, body });
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
