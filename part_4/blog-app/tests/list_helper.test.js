const { favoriteBlog, dummy, totalLikes } = require("../utils/list_helper");

  test("dummy returns one", () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)    
  });

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listOfBlogs = [
    {
      title: "Johnokjo",
      author: "234566554238",
      url: "https://www.google.com/",
      likes: 5,
      id: "5ead37cfbae5ea47a08f85a8",
    },
    {
      title: "Photoshop",
      author: "Luka Dimnik",
      url: "https://www.google.com/",
      likes: 8,
      id: "5ead571dbae5ea47a08f85a9",
    },
    {
      title: "Hadoop",
      author: "Luka Dimnik",
      url: "https://www.google.com/",
      likes: 10,
      id: "5ead5970f131d944440d4194",
    },
    {
      title: "Whoopsie",
      author: "Dolores",
      url: "https://www.google.com/",
      likes: 15,
      id: "5ead5e7468b4d93c406b4182",
    }
  ]

  test('of empty list is zero', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listOfBlogs)
    expect(result).toBe(38)
  })
})

describe('favorite blog', () => {
  const listOfBlogs = [
    {
      title: "Johnokjo",
      author: "Frank Sinatra",
      url: "https://www.google.com/",
      likes: 5,
      id: "5ead37cfbae5ea47a08f85a8",
    },
    {
      title: "Photoshop",
      author: "Luka Dimnik",
      url: "https://www.google.com/",
      likes: 15,
      id: "5ead571dbae5ea47a08f85a9",
    },
    {
      title: "Hadoop",
      author: "Luka Dimnik",
      url: "https://www.google.com/",
      likes: 10,
      id: "5ead5970f131d944440d4194",
    },
    {
      title: "Whoopsie",
      author: "Dolores",
      url: "https://www.google.com/",
      likes: 6,
      id: "5ead5e7468b4d93c406b4182",
    }
  ]

  test('returns the right blog', () => {
    const result = favoriteBlog(listOfBlogs)
    expect(result).toEqual({
      title: "Photoshop",
      author: "Luka Dimnik",
      url: "https://www.google.com/",
      likes: 15,
      id: "5ead571dbae5ea47a08f85a9",
    })
  })
})