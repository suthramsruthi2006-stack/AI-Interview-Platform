from datetime import datetime


def generate_report(

    candidate_name,
    role,
    score,
    feedback

):

    report = {

        "candidate": candidate_name,

        "role": role,

        "score": score,

        "feedback": feedback,

        "generated_at":

        datetime.now().strftime(

            "%d-%m-%Y %H:%M"

        )

    }

    return report