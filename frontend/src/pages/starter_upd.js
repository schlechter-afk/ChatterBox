const ext = {
    name: name,
  }
  const uriextid = "http://localhost:4003/user/extid";
  axios
  .post(uriextid, ext)
  .then(res => {   
    console.log("id req is:", res.data); 
    const id = res.data[0]._id;
    var creator = res.data[0].moderators;
    let currentDate = new Date().toJSON().slice(0, 10);
    const newd = {
      id: id,
      date: currentDate,
    }
    const nesturi = "http://localhost:4003/user/checkjoinuserstats";
    axios
    .post(nesturi,newd)
    .then(res=>{
      if(res.data.length > 0)
      {
        console.log("prexists");
        const newdj = {
          id: id,
          date: currentDate,
          joined_user: props,
        };
        const uriupdj = "http://localhost:4003/user/joinuserstats"; 
        axios
          .post(uriupdj, newdj)
          .then(res => {   
            console.log("in joinuserstats success");
          })
          .catch(err => {
              console.log("err in joinuser stats");
          });
      }
      else
      {
        console.log("doesnt exist prior");
        creator.push(props);
        const newdp = {
          id: id,
          date: currentDate,
          creator: creator,
        }
        const nesturip = "http://localhost:4003/user/createjoinstats";
        axios
        .post(nesturip,newdp)
        .then(res=>{
          console.log("yaya created join user stats at be");
        })
        .catch(err => {
          console.log("try buddy again");
        });
      }
    })
    .catch(err => {
      console.log("try buddy again");
    });
  })
  .catch(err => {
      alert("Try Again latest callfunc");
  });


    const id = subgredditarr[0]._id;
    let currentDate = new Date().toJSON().slice(0, 10);
    const newdch = {
      id: id,
      date: currentDate,
    }
    const nesturich = "http://localhost:4003/user/checkdailyposts";
    axios
    .post(nesturich,newdch)
    .then(res=>{
      if(res.data.length > 0)
      {
        console.log("prexists");
        const newdda = {
          id: id,
          date: currentDate,
          post: posttext,
        };
        const uriupdda = "http://localhost:4003/user/upddailyposts"; 
        axios
          .post(uriupdda, newdda)
          .then(res => {   
            console.log("in dailyposts success");
          })
          .catch(err => {
              console.log("err in dailyposts stats");
          });
      }
      else
      {
        console.log("doesnt exist prior");   
        const newdcr = {
          id: id,
          date: currentDate,
          curr_posts: ['no post', posttext],
        }
        const nesturicr = "http://localhost:4003/user/createdailyposts";
        axios
        .post(nesturicr,newdcr)
        .then(res=>{
          console.log("yaya created daily posts at front");
        })
        .catch(err => {
          console.log("try buddy again at front daily posts");
        });
      }
    })
    .catch(err => {
      console.log("try buddy again check daily posts frontend");
    });


    ///// Back Stats

        /// For Daily Posts
        const newddp = {
            id: id,
          }
          const nesturidp = "http://localhost:4003/user/extractdailyposts";
          axios
          .post(nesturidp,newddp)
          .then(res=>{
            if(res.data.length > 0)
            {
              var datedailyposts = [];
              var num_users = [];
              for(let i=0;i<res.data.length;i++)
              {
                datedailyposts.push(res.data[i].date);
                num_users.push(res.data[i].daily_posts.length);
              }
              const data = {
                labels: datedailyposts,
                datasets: [{data: num_users,
                label: 'Daily Posts',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'yellow',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,}],
              };
              if(isMounted)
              {
                setChartDataDailyPosts(data);   
              }  
            }
            else
            {
              alert("data Daily Posts doesnt exists");
            }
          })
          .catch(err => {
            console.log("try buddy again daily posts stats page front");
          });
      
          ///