const data = {
    'BinarySearch.java': `
    package DevideAndConqurer;

    public class Node {
        public int data;
        Node left_child;
        Node right_child;
        Node parent;
    
        Node(int data) {
            this.data = data;
            left_child = null;
            right_child = null;
            parent = null;
        }
    
    
        public int getData() {
            return data;
        }
    
        public void doStuff(int data) {
            int ab = data;
        }
    
        public int doStuffAgain(int data, int left, int right) {
            int abc = data;
            return abc;
        }
    
        public Node getLeftChild() {
            return left_child;
        }
    
        public Node getRightChild() {
            return right_child;
        }
    
    }
    
    `,
    'HeapSort.java': `
    package DevideAndConqurer;

    public class Node {
        public int data;
        Node left_child;
        Node right_child;
        Node parent;

        Node(int data) {
            this.data = data;
            left_child = null;
            right_child = null;
            parent = null;
        }


        public int getData() {
            return data;
        }

        public void doStuff(int data) {
            int ab = data;
        }

        public int doStuffAgain(int data, int left, int right) {
            int abc = data;
            return abc;
        }

        public Node getLeftChild() {
            return left_child;
        }

        public Node getRightChild() {
            return right_child;
        }

    }

    `,
    'QuickSort.java': `
        package DevideAndConqurer;

        public class Node {
            public int data;
            Node left_child;
            Node right_child;
            Node parent;
        
            Node(int data) {
                this.data = data;
                left_child = null;
                right_child = null;
                parent = null;
            }
        
        
            public int getData() {
                return data;
            }
        
            public void doStuff(int data) {
                int ab = data;
            }
        
            public int doStuffAgain(int data, int left, int right) {
                int abc = data;
                return abc;
            }
        
            public Node getLeftChild() {
                return left_child;
            }
        
            public Node getRightChild() {
                return right_child;
            }
        
        }
    
    `
}