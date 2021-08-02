+++
name= "vCluster"
image= "/images/platforms/vcluster.png"
category= "Platforms"
ring= "Strategic"
type="post"
layout="details"
+++

# What is it ?

Virtual clusters have their own API server which makes them much more powerful and better isolated than namespaces, but they are also much cheaper than creating separate "real" Kubernetes clusters.

# Why ?

Virtual clusters solve many of the problems that namespaces present, such as:

* Cluster-Scoped Resources: Certain resources live globally in the cluster, and you can’t isolate them using namespaces. For example, installing istio or any other operator in different versions is not possible within a single cluster.
* Shared Kubernetes control plane: the API server, etcd, scheduler, and controller-manager are shared in a single Kubernetes cluster. Request or storage rate-limiting based on a namespace is very hard and faulty configuration might bring down the whole cluster.

# For who ?
* [CharlesCD](https://charlescd.io/)

# Resources
* [homepage](https://www.vcluster.com/)
* [Documentation](https://www.vcluster.com/docs/what-are-virtual-clusters)


# Resources (Portuguese)
