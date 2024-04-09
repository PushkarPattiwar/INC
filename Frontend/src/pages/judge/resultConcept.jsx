import { useState } from "react";
import { FormsBanner, Buttons, Dropdown, NoteBox, toast } from "../../components";
import generateOptions from "../../utils/generateOptions";
import { useParams, useNavigate } from "react-router-dom";
import { useEvaluateProject } from "../../hooks/judge.hooks";

function ResultForms() {
    const { pid, jid } = useParams()
    const { mutate, isLoading } = useEvaluateProject('concepts')
    const navigate = useNavigate()

    const [form, setForm] = useState({
        innovation: "",
        approachToIdeas: "",
        approachToImplementation: "",
        principles: "",
        presentation: "",
    })

    function handleSubmit(e) {
        e.preventDefault();
        for (const property in form) {
            if (form[property] === "") {
                toast.warn("Please enter all fields!");
                return;
            }
        }
        mutate({ pid, jid, ...form }, {
            onSuccess: () => {
                toast.success(`${pid} evaluated successfully!`)
                navigate(-1, { replace: true })
            }
        })
    }

    return (
        <>
            <FormsBanner eventName='Evaluation' eventDescription= {`Enter Results for Concepts- ${pid} `} />
            <div className=" md:mx-20 mx-4 my-6">
                <form className="flex flex-col shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl border border-light_blue items-center p-4 md:p-8 mt-10 w-full">
                    <Dropdown label="Innovative Ideas Involved - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="innovation" required />
                    <Dropdown label="Approach To Exploit Ideas - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="approachToIdeas" required />
                    <Dropdown label="Approach Towards Implementing The System and Future Applications - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="approachToImplementation" required />
                    <Dropdown label="Implementation of Engineering Principles - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="principles" required />
                    <Dropdown label="Presentation and Q & A - (1-10)" options={[{ label: 'Select Score', value: '' }, ...generateOptions(1, 10)]} state={form} setState={setForm} name="presentation" required />
                    <Buttons
                        className="mx-2 my-2"
                        onClick={handleSubmit}
                        loading={isLoading}
                        value="Submit" />
                    <br />
                    <NoteBox title="Note"
                        text="Please do not disclose marks to the participants" />
                </form>
            </div>
        </>
    );
};

export default ResultForms;