#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random
import math
# Remote library imports
from faker import Faker
import bcrypt

# Local imports
from app import app
from models import db, User, Post, Comment, Tag, Playlist

fake = Faker()

# Function to generate fake users
def generate_fake_user():
    username=fake.name()
    password=random.choice(['123', 'abc'])
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password_bytes, salt)
    if len(username) > 20:
        username = username[0:20]
    return User(
        username=username,
        password_hash=password_hash,
        email=fake.email(),
        email_is_verified=False,
        datetime_created=datetime.now()
    )

def generate_fake_tag():
    words = fake.text(max_nb_chars=20)
    return Tag(
        text = words,
        datetime_created = datetime.now()
        )

def generate_fake_post():
    return Post(
        owner_id = random.choice(User.query.all()).id,
        title = r'When $$a \ne 0$$, there are two solutions to $$ax^2 + bx + c = 0$$',
        problem_body = fake.text(max_nb_chars=100),
        answer_body = fake.text(max_nb_chars=100),
        solution_body = fake.text(max_nb_chars=100),
        references = fake.text(max_nb_chars=100),
        status = 'published',
        datetime_created=datetime.now()
    )

def generate_fake_playlist():
    return Playlist(
        owner_id = random.choice(User.query.all()).id,
        title = fake.text(50),
        datetime_created=datetime.now()
    )

def generate_fake_root_comment():
    return Comment(
        owner_id = random.choice(User.query.all()).id,
        body = fake.text(70),
        post_id = random.choice(Post.query.all()).id, # if there are no posts, throws an error
        datetime_created = datetime.now()
        )

def generate_fake_child_comment():
    return Comment(
        owner_id = random.choice(User.query.all()).id,
        body = fake.text(70),
        parent_id = random.choice(Comment.query.all()).id, # if there are no comments, throws an error
        datetime_created = datetime.now()
        )




# Main function to seed the database
def seed_database():
    with app.app_context():
        # delete all entries in the database
        for i in (User.query.all() + Post.query.all() + Tag.query.all() + Comment.query.all() + Playlist.query.all()):
            db.session.delete(i)
        db.session.commit()

        # generate new users
        for i in range(8):
            user = generate_fake_user()
            db.session.add(user)
        # db.session.add(User(username='dev', email='dev@fake-email.com', datetime_created=datetime.now()))
        db.session.commit()

        tag_proofs = Tag(text = 'Proofs', datetime_created = datetime.now())
        tag_number_theory = Tag(text = 'Number theory', datetime_created = datetime.now())
        tag_integers = Tag(text = 'Integers', datetime_created = datetime.now())
        tag_vectors = Tag(text = 'Vectors', datetime_created = datetime.now())
        tag_optics = Tag(text = 'Optics', datetime_created = datetime.now())
        tag_focal_length = Tag(text = 'Focal length', datetime_created = datetime.now())
        tag_lenses = Tag(text = 'Lenses', datetime_created = datetime.now())
        tag_current = Tag(text = 'Current', datetime_created = datetime.now())
        tag_circuits = Tag(text = 'Circuits', datetime_created = datetime.now())
        tag_v_equals_ir = Tag(text = 'V = IR', datetime_created = datetime.now())
        tag_Newtons_law = Tag(text = "Newton's Laws", datetime_created = datetime.now())
        tag_sigma_f = Tag(text = 'ΣF', datetime_created = datetime.now())
        tag_probablity = Tag(text = 'Probability', datetime_created = datetime.now())
        tag_series = Tag(text = 'Series', datetime_created = datetime.now())
        tag_Fourrier = Tag(text = 'Fourrier Transform', datetime_created = datetime.now())
        tag_euler_identity = Tag(text = 'Euler identity', datetime_created = datetime.now())
        tag_complex_numbers = Tag(text = 'Complex numbers', datetime_created = datetime.now())
        tag_chemistry = Tag(text = 'Chemistry', datetime_created = datetime.now())
        tag_decay = Tag(text = 'Decay', datetime_created = datetime.now())
        




        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"Show that $$ |\vec{u} \times \vec{v} |^{2}+ (\vec{u} \cdot \vec{v})^{2} = u^{2}v^{2} $$.",
        problem_body = r"Show that $$ |\vec{u} \times \vec{v} |^{2} + (\vec{u} \cdot \vec{v})^{2} =  u^{2}v^{2} $$.",
        answer_body = r"Express the products in terms of the magnitudes of $$ \vec{u}$$ and $$\vec{v}$$ and the angle between them.",
        solution_body = r"Let $$\theta$$ be the the angle between $$\vec{u}$$ and $$\vec{v}$$. Then $$ |\vec{u} \times \vec{v} |^{2} = u^{2} v^{2} \sin^{2} \theta$$. And $$(\vec{u} \cdot \vec{v})^{2} = u^{2} v^{2} \cos^{2} \theta$$. The sum is $$u^{2} v^{2} (\cos^{2} \theta + \sin^{2} \theta)$$ which simplifies to $$ u^{2} v^{2}$$",
        references = "https://www-users.cse.umn.edu/~akhmedov/samplem1",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_vectors]
        )
        db.session.add(post)
        db.session.commit()

        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"What is the current through two parallel resistors?",
        problem_body = r"Two resistors $$R_1$$ and $$R_2$$ are connected in parallel with a voltage $$V$$ across them. In terms of these variables, what is the total current through the resistors? ",
        answer_body = r"$$ I = V (R_1 + R_2) / (R_1 R_2)$$",
        solution_body = r"The current through each resistor is found by applying $$ V = IR$$. Thus $$ I_1 = V / R_1 $$ and $$ I_2 = V / R_2 $$. Adding the two currents together yeilds the answer above." ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_circuits, tag_v_equals_ir, tag_current]
        )
        db.session.add(post)
        db.session.commit()

        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"Prove that there are no integers between 0 and 1",
        problem_body = r"Theorem: There are no integers between 0 and 1. Is the theorem true?",
        answer_body = r"The theorem is true.",
        solution_body = r"Let $$S = \{ n \in \mathbb{Z} | n > 0 \}$$. Let $$a$$ be the smallest element in $$S$$. Assume for the sake of contradiction that $$a < 1$$. Multiplying both sides of the inquality by $$a$$ does not affect the validity of the inequality. Thus $$a^2 < a $$, and $$a^2 \in S$$, which is a contradiction. Therefore, the smallest positive integer is not less than one.",
        references = r"https://www.scijournal.org/articles/integer-number-symbol-in-latex#:~:text=Integer%20Number%20in%20LaTeX,takes%20one%20value%20as%20argument.&text=As%20you%20can%20see%2C%20you,%7D%2C%20it%20accepts%20any%20letter.",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_proofs, tag_number_theory, tag_integers]
        )
        db.session.add(post)
        db.session.commit()

        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"Rate of chemical reaction $$  2 Na + 2 H_2 O \rightarrow 2 NaOH + H_2 $$ ?",
        problem_body = r"$$  2 Na + 2 H_2 O \rightarrow 2 NaOH + H_2 $$",
        answer_body = r"",
        solution_body = r""  ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_chemistry]
        )
        db.session.add(post)
        db.session.commit()

        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"$$ f(x) = \sum_{n=0}^\infty \left( a_n \cos (n \pi x) + b_n \sin(n \pi x) \right) $$",
        problem_body = r"$$ \vec \nabla \times \vec B = \mu_{0} \epsilon_{0} \frac{\partial \vec{E}}{\partial t} + \mu_{0} \vec{J}$$",
        answer_body = r"",
        solution_body = r""  ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_series, tag_Fourrier]
        )
        db.session.add(post)
        db.session.commit()

        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"Calculate the focal length of a lens",
        problem_body = r"An object is placed $$5 \mathrm{cm}$$ away from a lens, and its image is in focus at a distance of $$20 \mathrm{cm}$$ on the other side of the lens. What is the focal length of the lens? ",
        answer_body = r"The focal length of the lens is $$4 \mathrm{cm} $$.",
        solution_body = r"The formula for the focal length $$f$$ of a lens in terms of object distance $$d_o$$ and image distance $$d_i$$ is $$f = d_o d_i / (d_o + d_i)$$. $$d_o = 5 \mathrm{cm}$$ and $$d_i = 20 \mathrm{cm}$$. Thus, $$f = (5 \mathrm{cm}) (20\mathrm{cm}) / (5\mathrm{cm} + 20\mathrm{cm}) = 4 \mathrm{cm}$$." ,
        references = "https://secure-media.collegeboard.org/digitalServices/pdf/ap/ap17-physics-2-q3.pdf",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_optics, tag_lenses, tag_focal_length]
        )
        db.session.add(post)
        db.session.commit()



        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"What is the probability of drawing certain marbles from a bag?",
        problem_body = r"A bag contains 6 red marbles and 5 blue marbles. If you draw two marbles, what is the probability they are different colors?",
        answer_body = r"$$ P = 6/11 $$",
        solution_body = r"The red marbles are indistinguishable from each other, and the blue marbles are indistinguishable from each other. To draw marbles of different colors, you can draw a red one first and then a blue one, and vice versa. \n\n  The probability of drawing a blue marble first is $$6/11$$ and the probability of drawing a red marble next is $$5/10$$. The events are independent, and so the probability of both events happening is the product of the probability of each event. \n\n The probabilities of drawing a red marble and then a blue one are $$5/11$$ and $$6/10$$ respectfully. \n\n The probability of drawing two different marbles is the sum of the probablities of each sequence of events. $$P = (6/11)(5/10) + (5/11)(6/10) = 6/11 $$"  ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_probablity]
        )
        db.session.add(post)
        db.session.commit()

        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r" Newton's Law $$ \vec{F} = m \vec{a} $$",
        problem_body = r"$$ \Phi_E = \int \vec{E} \mathrm{d} \vec{A} ; \quad \Phi_B = \int \vec{B} \mathrm{d} \vec{A}  $$",
        answer_body = r"",
        solution_body = r""  ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_Newtons_law, tag_vectors]
        )
        db.session.add(post)
        db.session.commit()


        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"Prove that $$ e^{i\theta} = \cos\theta + i \sin\theta $$",
        problem_body = r"$$ \sum_{n=0}^\infty \frac{1}{n!} = \lim_{n \rightarrow \infty} (1 + 1/n)^n $$",
        answer_body = r"",
        solution_body = r""  ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_complex_numbers, tag_euler_identity]
        )
        db.session.add(post)
        db.session.commit()



        post = Post(owner_id = random.choice(User.query.all()).id,
        title = r"Rate of radioactive decay $$ A(t) = A_0 e^{-t/\tau} $$",
        problem_body = r"$$ \frac{ \mathrm{d} y(x)}{\mathrm{d} x} = \lim_{\epsilon \rightarrow 0} \frac{ y(x+\epsilon) - y(x)}{\epsilon} $$",
        answer_body = r"",
        solution_body = r""  ,
        references = "",
        status = 'published',
        datetime_created=datetime.now(),
        tags = [tag_decay]
        )
        db.session.add(post)
        db.session.commit()

        # # generate new posts
        # for i in range(8):
        #     post = generate_fake_post()
        #     db.session.add(post)
        # db.session.commit()

        # # generate new tags
        # for i in range(12):
        #     tag = generate_fake_tag()
        #     db.session.add(tag)
        # db.session.commit()

        # generate new root comments
        for i in range(20):
            comment = generate_fake_root_comment()
            db.session.add(comment)
        db.session.commit()

        # generate new child comments
        for i in range(35):
            comment = generate_fake_child_comment()
            db.session.add(comment)
            # commit comments one at a time to generate chains of comments
            db.session.commit()
        
        #generate new playlists
        for i in range(8):
            playlist = generate_fake_playlist()
            db.session.add(playlist)
        db.session.commit()

        # add tags to posts
        # for i in Post.query.all():
        #     for j in random.sample(Tag.query.all(), random.choice(range(2,len(Tag.query.all())))):
        #         i.tags.append(j)
        # #     post_tag = generate_fake_post_tag()
        # #     db.session.add(post_tag)
            
        #     # commit one at a time to avoid making duplicates
        #     db.session.commit()
        

        # add posts to playlists
        for i in Playlist.query.all():
            for j in random.sample(Post.query.all(), random.choice(range(2, len(Post.query.all())))):
                i.posts.append(j)
        #     playlist_post = generate_fake_playlist_post()
        #     db.session.add(playlist_post)
            # commit one at a time to avoid making duplicates
            db.session.commit()


   
    
if __name__ == "__main__":
    seed_database()