import React from 'react';

const Ticket = () => {
  return (
    <div>
      <main>
        <section>
          <h1>Title</h1>
          <article>
            <h2>Reporter Name raised this request</h2>
            <h3>Description</h3>
            <p>
              Description comes here. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc eget dapibus nunc, ut ornare diam. Morbi
              felis libero, tincidunt quis sapien et, sollicitudin pulvinar
              diam. Etiam metus leo, tincidunt at pharetra eu, placerat sit amet
              neque. Pellentesque vel tortor nec ligula vulputate gravida eget
              quis metus. Donec accumsan, lorem sed porta vulputate, magna ante
              vulputate dolor, vitae dapibus risus ex sed nibh. Nunc venenatis
              lorem nec arcu hendrerit gravida. Suspendisse quis eros a massa
              fermentum convallis vitae in orci. Nam pulvinar tristique nibh
              vehicula hendrerit. Aliquam laoreet ac velit ut pharetra. Nulla
              fringilla in libero id vestibulum. Vivamus blandit eros in finibus
              fermentum. Nulla ac luctus libero.
            </p>
          </article>
        </section>
        <section>
          <h2>Comments</h2>
          <article>
            <h3>Reporter Name 1 minute ago</h3>
            <p>
              Integer lorem justo, laoreet eu purus non, lobortis fermentum
              nisl. Nam nec imperdiet mi. Aenean ac est mauris. Nam eleifend ex
              velit, ac feugiat tellus dapibus eu. Suspendisse sagittis dui
              ipsum, quis vehicula nisi commodo nec. Phasellus maximus vel velit
              id euismod. Aenean nec rhoncus arcu, quis congue nulla. Integer
              vel iaculis risus. Sed porta id orci non tempus. Vivamus et tortor
              id felis efficitur tincidunt sodales sit amet urna. Duis accumsan,
              felis vel porta consectetur, nibh odio suscipit sem, in rutrum
              neque dui at sapien. Suspendisse blandit velit a nibh condimentum,
              id vestibulum enim varius.
            </p>
            <div>
              <button>Edit</button> <button>Delete</button>
            </div>
          </article>
          <article>
            <h3>Reporter Name 32 seconds ago</h3>
            <p>
              Fusce molestie aliquam nunc, non ornare diam fringilla quis.
              Quisque consectetur non nunc accumsan vestibulum. Sed aliquam
              tristique magna non lobortis. Duis posuere, ligula nec suscipit
              tempus, orci augue sollicitudin leo, vel bibendum nibh augue
              bibendum urna. Donec vitae pretium tortor. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Aenean vel condimentum felis.
            </p>
            <div>
              <button>Edit</button> <button>Delete</button>
            </div>
          </article>
        </section>
        <section>
          <h2>Add internal note | Reply to customer</h2>
          <form action="">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div>
              <button>Save</button> <button>Cancel</button>
            </div>
          </form>
        </section>
      </main>
      <aside>
        <section>
          <h4>Status</h4>
          <p>Waiting for customer</p> <button>change status</button>
        </section>
        <section>
          <h4>SLA</h4>
          <p>6 hours time to done</p>
        </section>
        <section>
          <h4>Assignee</h4>
          <p>Assignee Name</p>
        </section>
        <section>
          <h4>Reporter</h4>
          <p>Reporter Name</p>
        </section>
        <section>
          <h4>Request participants</h4>
          <select id="assignee">
            <option className="option">Support</option>
            <option className="option" value="Robbie Meijer">
              Robbie Meijer
            </option>
            <option className="option" value="Rianna Vos">
              Rianna Vos
            </option>
            <option className="option" value="Ronald Peters">
              Ronald Peters
            </option>
            <option className="option" value="Hanna van Leeuwen">
              Hanna van Leeuwen
            </option>
          </select>
          <h4>Priority</h4>
          <p>High</p>
        </section>
        <section>
          <h4>Due date</h4>
          <p>None</p>
        </section>
      </aside>
    </div>
  );
};

export default Ticket;
