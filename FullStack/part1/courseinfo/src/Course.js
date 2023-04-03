const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };
  
  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };
  
  const Content = ({ content }) => {
    return (
      <>
        {content.map((part) => (
          <Part part={part.name} exercises={part.exercises} key={part.name} />
        ))}
      </>
    );
  };
  
  const Total = ({ parts }) => {
    const sum = parts.reduce(
      (acc, part) => {
        acc = parseInt(acc) + part.exercises;
        return acc;
      },
      [0]
    ); // const sum = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  
    return <strong>total of {sum} exercises</strong>;
  };
  
  const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content content={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };

  export default Course;