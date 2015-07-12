app.controller('MainCtrl', ['$scope', 'posts', 'auth',
    function ($scope, posts, auth) {
        // bind posts array to factory (service)
        $scope.posts = posts.posts;
        $scope.isLoggedIn = auth.isLoggedIn;

        // Function to add new post to the "posts" array
        $scope.addPost = function () {
            // Check if empty title and don't allow post
            if (!$scope.title || $scope.title === '') {
                return;
            }

            posts.create({
                title: $scope.title,
                link: $scope.link
            });
            $scope.title = '';
            $scope.link = '';
            // Clear title once added
            $scope.title = '';
            // Clear the link once added
            $scope.link = '';
        };

        // Function to increment the upvote counter of a post
        $scope.incrementUpvotes = function (post) {
            posts.upvote(post);
        };
    }
]);